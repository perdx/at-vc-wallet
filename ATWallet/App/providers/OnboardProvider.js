import React, { createContext, useContext, useReducer } from 'react';

import base64 from 'base-64';
import Config from 'react-native-config';
import * as Keychain from 'react-native-keychain';
import 'react-native-get-random-values'; // Needed for uuid (https://github.com/uuidjs/uuid#getrandomvalues-not-supported)
import { v1 as uuidv1 } from 'uuid';

const OnboardContext = createContext(undefined);

const reducer = (state, action) => {
    switch (action.type) {
        case 'init': {
            return {
                ...state,
                loading: true,
                error: null,
            };
        }
        case 'loaded': {
            const { id, password } = action.payload;
            return {
                ...state,
                startup: false,
                id,
                password,
                loading: false,
                error: null,
            };
        }
        case 'statusChecked': {
            const { status, message } = action.payload;
            return {
                ...state,
                status,
                message,
                loading: false,
                error: null,
            };
        }
        case 'created': {
            const { id, password, status, data, message } = action.payload;
            return {
                ...state,
                id,
                password,
                status,
                message,
                loading: false,
                error: null,
                data,
            };
        }
        case 'error': {
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };
        }
        case 'reset': {
            return {
                ...state,
                loading: false,
                error: '',
            };
        }
        default:
            throw new Error(`Unsupported action type dispatched to OnboardProvider reducer: ${action.type}`);
    }
};

export const useOnboard = () => {
    const context = useContext(OnboardContext);
    if (!context) {
        throw new Error('useOnboard must be used within an OnboardProvider');
    }
    const { state, dispatch } = context;

    // Send onboard request to API
    const create = async (data) => {
        dispatch({ type: 'init' });

        // Generate a uuid as a 'password' and store in keychain
        // (Use v1 so that if we need to we can infer issues with multiple requests from a single device)
        const password = uuidv1();

        const uri = Config.API_HOST + '/register';
        const body = { password, ...data };
        try {
            const res = await fetch(uri, { method: 'POST', body: JSON.stringify(body) });
            if (res.status !== 200) {
                console.error('HTTP Status: ' + res.status);
                dispatch({ type: 'error', payload: { error: 'API response status not OK' } });
            }
            const resData = await res.json();
            dispatch({
                type: 'created',
                payload: { id: resData.id, password, status: resData.status, data, message: resData.message },
            });
            const p = JSON.stringify({ id: resData.id, password });
            await Keychain.setGenericPassword('onboard request token', p, { service: 'onboard' });
        } catch (e) {
            console.error(e);
            dispatch({ type: 'error', payload: { error: 'Exception in create onboard API call' } });
        }
    };

    // Check the onboarding status from the API
    const check = async () => {
        dispatch({ type: 'init' });
        const kcEntry = await Keychain.getGenericPassword({ service: 'onboard' });
        let kc = { id: null, password: '' };
        if (kcEntry) {
            kc = JSON.parse(kcEntry.password);
        }
        dispatch({ type: 'loaded', payload: kc });
        if (kc.id === null || kc.password === '') {
            return;
        }

        let uri = Config.API_HOST + '/register/status';
        // For demo purposes only, send the status you want reflected back. Leave blank for demo default.
        uri += '?status=' + Config.ONBOARD_STATUS;

        const hdr = new Headers();
        // TODO: Review this basic auth.
        hdr.append('Authorization', 'Basic ' + base64.encode(kc.id + ':' + kc.password));

        try {
            const res = await fetch(uri, { headers: hdr });
            if (res.status !== 200) {
                console.error('HTTP Status: ' + res.status);
                dispatch({ type: 'error', payload: { error: 'API response status not OK' } });
            }
            const data = await res.json();
            dispatch({ type: 'statusChecked', payload: data });
        } catch (e) {
            console.error(e);
            dispatch({ type: 'error', payload: { error: 'Exception in checkStatus API call' } });
        }
    };

    // Reset the state ready for another check (usually following an error)
    const reset = () => {
        dispatch({ type: 'reset' });
    };

    return { state, check, create, reset };
};

const OnboardProvider = (props) => {
    const initState = {
        startup: true,
        id: null,
        password: '',
        status: '',
        message: '',
        loading: false,
        error: null,
        data: {
            givenName: '',
            familyName: '',
        },
    };

    const [state, dispatch] = useReducer(reducer, initState);

    return (
        <OnboardContext.Provider value={{ state, dispatch }}>
            {props.children}
        </OnboardContext.Provider>
    );
};

export default OnboardProvider;
