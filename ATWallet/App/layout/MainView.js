import React from 'react';

import { View, StyleSheet } from 'react-native';

import { displayName as appName } from '../../app.json';
import TitleAppbar from './TitleAppbar';

const MainView = (props) => {

    const openDrawer = () => {
        console.log('Open drawer');
    };

    const addVC = () => {
        console.log('Add verifiable credential');
    };

    return (
        <View style={styles.container}>
            <TitleAppbar appName={appName} onOpenDrawer={openDrawer} onAddVC={addVC} />
            {props.children}
        </View>
    );
};

export default MainView;

const styles = StyleSheet.create({
    container: {
        height: '100%',
    },
});
