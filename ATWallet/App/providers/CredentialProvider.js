import React, { createContext, useContext, useEffect, useState } from 'react';

import * as Keychain from 'react-native-keychain';

const CredentialContext = createContext(undefined);

export const useCredentials = () => {
    const context = useContext(CredentialContext);
    if (!context) {
        throw new Error('useCredentials must be used within a CredentialProvider');
    }
    return context;
};

export const useCredential = (id) => {
    const { credentials } = useCredentials();
    return credentials.find(c => c.id === id);
};

const CredentialProvider = (props) => {
    const [state, setState] = useState({
        credentials: [],
        loading: true,
    });

    useEffect(() => {
        load();
    }, []);

    // Retrieve credential list from local keychain storage.
    const load = async () => {
        const kcEntry = await Keychain.getGenericPassword({ service: 'credentials' });
        let credentials = [];
        if (kcEntry) {
            credentials = JSON.parse(kcEntry.password);
        }
        setState({ credentials, loading: false });
    };

    // Write credential list to local keychain storage.
    const store = async () => {
        const c = JSON.stringify(state.credentials);
        const description = 'verifiable credentials';
        await Keychain.setGenericPassword(description, c, { service: 'credentials' });
    };

    // Add a credential to context state.
    const add = (credential) => {
        const credentials = state.credentials.slice();
        credentials.push(credential);
        setState({ ...state, credentials });
    };

    return (
        <CredentialContext.Provider value={state}>
            {props.children}
        </CredentialContext.Provider>
    );
};

export default CredentialProvider;

