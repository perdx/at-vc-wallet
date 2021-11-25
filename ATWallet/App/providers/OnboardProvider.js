import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

import base64 from 'base-64';
import Config from 'react-native-config';
import * as Keychain from 'react-native-keychain';

const OnboardContext = createContext(undefined);

export const useOnboard = () => {
    const context = useContext(OnboardContext);
    if (!context) {
        throw new Error('useOnboard must be used within an OnboardProvider');
    }
    return context;
};

const OnboardProvider = (props) => {
    const [state, setState] = useState({
        requestID: null,
        password: '',
        status: '',
        message: '',
        loading: true,
        error: null,
    });

    useEffect(() => {
        const fetchData = async () => {
            await load();
            await checkStatus();
            setState(s => ({ ...s, loading: false }));
        };
        fetchData();
    }, [checkStatus]);

    // Retrieve credential ID from local keychain storage
    const load = async () => {
        const kcEntry = await Keychain.getGenericPassword({ service: 'onboard' });
        let data = { id: null, password: '' };
        if (kcEntry) {
            data = JSON.parse(kcEntry.password);
        }
        setState(s => ({ ...s, requestID: data.id, password: data.password }));
    };

    // Check the onboarding status from the API
    const checkStatus = useCallback(async () => {
        if (!state.requestID || state.password === '') {
            return;
        }

        let uri = Config.API_HOST + '/register/' + state.requestID;

        // For demo purposes only, send the status you want reflected back
        uri += '?status=' + Config.ONBOARD_STATUS;

        const hdr = new Headers();
        // TODO: Review this basic auth.
        // (For now, sending ID in URL and header is deliberate if inelegant - allows consistency with Postman testing)
        hdr.append('Authorization', 'Basic ' + base64.encode(state.requestID + ':' + state.password));

        try {
            const res = await fetch(uri);
            const httpStatus = res.status;
            if (httpStatus !== 200) {
                console.error('HTTP Status: ' + httpStatus);
                setState(s => ({ ...s, error: 'API response status not OK' }));
            }
            const data = await res.json();
            setState(s => ({ ...s, status: data.status, message: data.message }));
        } catch (e) {
            console.error(e);
            setState(s => ({ ...s, error: 'Exception in checkStatus API call' }));
        }
    }, [state.requestID, state.password]);

    return (
        <OnboardContext.Provider value={state}>
            {props.children}
        </OnboardContext.Provider>
    );
};

export default OnboardProvider;
