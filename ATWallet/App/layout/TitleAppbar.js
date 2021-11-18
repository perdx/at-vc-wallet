import React from 'react';

import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';

const TitleAppbar = (props) => {
    const { appName, onOpenDrawer, onAddVC } = props;

    const handleOpenDrawer = () => {
        onOpenDrawer();
    };

    const handleAddVC = () => {
        onAddVC();
    };

    return (
        <Appbar.Header style={styles.header}>
            <Appbar.Action icon="menu" onPress={handleOpenDrawer} />
            <Appbar.Content title={appName} />
            <Appbar.Action icon="plus-thick" onPress={handleAddVC} />
        </Appbar.Header>
    );
};

export default TitleAppbar;

const styles = StyleSheet.create({
    header: {
        elevation: 0,
    },
});
