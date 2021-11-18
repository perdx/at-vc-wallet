import React from 'react';

import { StyleSheet } from 'react-native';
import { IconButton, List, useTheme } from 'react-native-paper';

import ATLogo from '../../assets/ATLogo';

const CredentialListItem = (props) => {
    const { credential } = props;
    const theme = useTheme();

    // TODO: Navigation
    const goToCredential = () => {
        console.log('Go to VC details');
    };

    return (
        <List.Item
            onPress={goToCredential}
            title={credential.title}
            left={() => <ATLogo width="60" height="60" />}
            right={() => <IconButton icon="chevron-right" onPress={goToCredential} size={32} />}
            style={styles(theme).listItem}
        />
    );
};

export default CredentialListItem;

const styles = theme => StyleSheet.create({
    listItem: {
        borderBottomColor: theme.colors.disabled,
        borderBottomWidth: 1,
        paddingTop: 16,
        paddingBottom: 16,
    },
});
