import React from 'react';

import { StyleSheet } from 'react-native';
import { IconButton, List, useTheme } from 'react-native-paper';

import ATLogo from '../assets/ATLogo';

const VCListItem = (props) => {
    const { vcName } = props;
    const theme = useTheme();

    const goToVC = () => {
        console.log('Go to VC details');
    };

    return (
        <List.Item
            onPress={goToVC}
            title={vcName}
            left={() => <ATLogo width="60" height="60" />}
            right={() => <IconButton icon="chevron-right" onPress={goToVC} size={32} />}
            style={styles(theme).listItem}
        />
    );
};

export default VCListItem;

const styles = theme => StyleSheet.create({
    listItem: {
        borderBottomColor: theme.colors.disabled,
        borderBottomWidth: 1,
        paddingTop: 16,
        paddingBottom: 16,
    },
});
