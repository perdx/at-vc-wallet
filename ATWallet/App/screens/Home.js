import React from 'react';

import { FlatList } from 'react-native';

import CredentialListItem from '../components/listitems/CredentialListItem';

// TODO: Credentials will come from context.
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

const Home = (props) => {
    // TODO: Credentials should come from context, already populated.
    // (This screen should not be displayed if there are no credentials)
    const credentials = fakeCredentials;
    const { navigation } = props;

    const handleItemSelected = (credential) => {
        navigation.navigate('Credential', credential);
    };

    return (
        <FlatList
            data={credentials}
            keyExtractor={(c) => c.id}
            renderItem={(c) =>
                <CredentialListItem credential={c.item} onItemSelected={() => handleItemSelected(c.item)} />
            }
        />
    );
};

export default Home;
