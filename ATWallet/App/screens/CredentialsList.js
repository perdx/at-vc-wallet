import React from 'react';

import { FlatList } from 'react-native';
import { List } from 'react-native-paper';

import CredentialListItem from '../components/listitems/CredentialListItem';

// TODO: Get credential list from storage. Access via a hook.
//       Consider using same VC schema as back end without mappings.
const fakeCredentials = [
    {
        id: 'fakecredential',
        title: 'MyAT',
        claims: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'jd@example.com',
        },
    },
];


const CredentialsList = () => {
    // TODO: Get credentials using hook here
    // const credentials = useCredentials();
    const credentials = fakeCredentials;

    const onItemSelected = (credential) => {
        // TODO: Replace with react-navigation navigate
        console.log('Navigate to credential details');
    };

    return (
        <FlatList
            data={credentials}
            keyExtractor={(c) => c.id}
            ListEmptyComponent={() => <EmptyListItem />}
            renderItem={(c) =>
                <CredentialListItem credential={c.item} onItemSelected={() => onItemSelected(c)} />
            }
        />
    );
};

export default CredentialsList;

const EmptyListItem = () => {
    return (
        <List.Item title="No credentials yet. Tap '+' to add." />
    );
};