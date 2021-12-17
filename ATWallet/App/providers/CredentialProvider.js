import React, { createContext, useCallback, useContext, useReducer } from 'react';

import jwt_decode from 'jwt-decode';
import Config from 'react-native-config';
import * as Keychain from 'react-native-keychain';

const CredentialContext = createContext(undefined);

const getStoredCreds = async () => {
    const kcEntry = await Keychain.getGenericPassword({ service: 'credentials' });
    let credentials = [];
    if (kcEntry) {
        credentials = JSON.parse(kcEntry.password);
    }
    return credentials;
};

const storeCreds = async (credentials) => {
    const c = JSON.stringify(credentials);
    const description = 'verifiable credentials';
    await Keychain.setGenericPassword(description, c, { service: 'credentials' });
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'init': {
            return {
                ...state,
                loading: true,
                message: '',
                error: null,
            };
        }
        case 'loaded': {
            return {
                ...state,
                startup: false,
                credentials: action.payload.credentials,
                loading: false,
                error: null,
            };
        }
        case 'issuanceRequested': {
            return {
                ...state,
                issuance: action.payload,
                issuanceStatus: 'requested',
            };
        }
        case 'issuanceStateChecked': {
            return {
                ...state,
                issuanceStatus: action.payload.status,
            };
        }
        case 'issuanceFailed': {
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                issuance: null,
                issuanceStatus: null,
            };
        }
        case 'vcReceived': {
            const { credential } = action.payload;
            const credentials = JSON.parse(JSON.stringify(state.credentials));
            credentials.push(credential);
            return {
                ...state,
                credentials,
                loading: false,
                error: null,
                issuance: null,
                issuanceStatus: null,
            };
        }
        case 'error': {
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };
        }
        default:
            throw new Error(`Unsupported action type dispatched to CredentialProvider reducer: ${action.type}`);
    }
};

export const useCredentials = () => {
    const context = useContext(CredentialContext);
    if (!context) {
        throw new Error('useCredentials must be used within a CredentialProvider');
    }
    const { state, dispatch } = context;

    // Retrieve credential list from local keychain storage.
    const load = async () => {
        dispatch({ type: 'init' });
        const credentials = await getStoredCreds();
        dispatch({ type: 'loaded', payload: { credentials } });
    };

    // Invoke issuance of a pending VC.
    // TODO: Add onboarding 'id' and 'password' to request so the issuer can check before issuing.
    const issuance = async () => {
        dispatch({ type: 'init' });

        const uri = Config.API_HOST + '/issuer/issuance';
        try {
            const res = await fetch(uri, { method: 'GET' });
            if (res.status !== 200) {
                console.error('HTTP Status: ' + res.status);
                dispatch({ type: 'error', payload: { error: 'API response status not OK' } });
                return;
            }
            const resData = await res.json();
            console.log(resData);
            dispatch({ type: 'issuanceRequested', payload: { ...resData } });
        } catch (e) {
            console.error(e);
            dispatch({ type: 'error', payload: { error: 'Exception in issuance API call' } });
        }
    };

    const issuanceState = useCallback(async () => {
        if (!state.issuance) {
            return;
        }

        dispatch({ type: 'init' }); // TODO: Is this needed?
        const uri = `${Config.API_HOST}/issuer/status/${state.issuance.state}`;

        const callAPI = async () => {
            try {
                const res = await fetch(uri, { method: 'GET' });
                if (res.status !== 200) {
                    console.error('HTTP Status: ' + res.status);
                    dispatch({ type: 'issuanceFailed', payload: { error: 'API response status not OK' } });
                    return;
                }
                const resData = await res.json();
                console.log(resData);
                if (resData.status === 'issuance_error') {
                    console.log(resData.message);
                    dispatch({ type: 'issuanceFailed', payload: { error: resData.message } });
                } else {
                    dispatch({ type: 'issuanceStateChecked', payload: { ...resData } });
                    if (resData.status !== 'awaiting_issuance') {
                        setTimeout(callAPI, 5000);
                    }
                }
            } catch (e) {
                console.error(e);
                dispatch({ type: 'issuanceFailed', payload: { error: 'Exception in issuance status check API call' } });
            }
        };

        callAPI();

    }, [state.issuance, dispatch]);

    const getVC = useCallback(async (vcuri) => {
        dispatch({ type: 'init' });
        const uri = vcuri.split('request_uri=').pop();
        try {
            const res = await fetch(uri, { method: 'GET' });
            if (res.status !== 200) {
                // Can't recover from this. Need to clear issuance from state to enable user to
                // try again. (This can happen if we don't claim the VC fast enough and the
                // issuance expires, for example).
                console.error('Get token HTTP Status: ' + res.status);
                const errorInfo = await res.json();
                console.log(errorInfo);
                dispatch({ type: 'issuanceFailed', payload: { error: 'Token API response status not OK' } });
                return;
            }
            // Response body should be a JWT as a string
            const jwt = await res.text();
            const decoded = jwt_decode(jwt);
            console.log(JSON.stringify(decoded, null, 2));

            const authURI = `${Config.AUTH_ENDPOINT}?client_id=${decoded.client_id}&redirect_uri=vcclient%3A%2F%2Fopenid%2Fresponse_mode=query&response_type=code&scope=openid&state=${decoded.state}&nonce=${decoded.nonce}`;

            console.log('Logging in');
            console.log(authURI);
            const authRes = await fetch(authURI, { method: 'Get' });

            if (authRes.status !== 200) {
                console.error('Authorise HTTP Status: ' + authRes.status);
                const errorInfo = await authRes.json();
                console.log(errorInfo);
                dispatch({ type: 'issuanceFailed', payload: { error: 'Authorisation API response status not OK' } });
                return;
            }

            console.log(authRes.json());

            dispatch({ type: 'vcReceived', payload: { credential: '' } });

            // TODO: update keychain storage
        } catch (e) {
            console.error(e);
            dispatch({ type: 'issuanceFailed', payload: { error: 'Exception in fetching VC' } });
        }
    }, [dispatch]);

    // Claim credential from issuer
    // const claim = async () => {
    //     dispatch({ type: 'init' });

    //     // Call issuer/issuance and get the URL for the VC


    //     // Call VC URL and get OpenID token


    //     // Decode token into VC


    //     // Add the VC to local storage
    //     const storedCreds = await getStoredCreds();
    //     storedCreds.push(credential);
    //     await storeCreds(storedCreds);

    //     // Add the VC to current state

    // };

    return { state, getVC, issuance, issuanceState, load };
};

const CredentialProvider = (props) => {
    const initalState = {
        startup: true,
        credentials: [],
        loading: false,
        message: '',
        error: null,
        issuance: null,
        issuanceStatus: null,
    };

    const [state, dispatch] = useReducer(reducer, initalState);

    return (
        <CredentialContext.Provider value={{ state, dispatch }}>
            {props.children}
        </CredentialContext.Provider>
    );
};

export default CredentialProvider;
