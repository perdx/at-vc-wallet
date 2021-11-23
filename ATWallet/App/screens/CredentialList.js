import React from 'react';

import { FlatList } from 'react-native';

import CredentialListItem from '../components/listitems/CredentialListItem';
import { useCredentials } from '../providers/CredentialProvider';

// const fakeCredentials = [
//     {
//         id: 'fakecredential',
//         title: 'MyAT',
//         claims: {
//             firstName: 'John',
//             lastName: 'Doe',
//             email: 'jd@example.com',
//         },
//     },
// ];

const CredentialList = (props) => {
    const { credentials } = useCredentials();
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

export default CredentialList;
