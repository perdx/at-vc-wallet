import React from 'react';
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
        <Appbar.Header>
            <Appbar.Action icon="menu" onPress={handleOpenDrawer} />
            <Appbar.Content title={appName} />
            <Appbar.Action icon="plus-thick" onPress={handleAddVC} />
        </Appbar.Header>
    );
};

export default TitleAppbar;
