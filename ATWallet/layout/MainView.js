import React from 'react';

import { View } from 'react-native';

import { displayName as appName } from '../app.json';
import TitleAppbar from './TitleAppbar';

const MainView = (props) => {

    const openDrawer = () => {
        console.log('Open drawer');
    };

    const addVC = () => {
        console.log('Add verifiable credential');
    };

    return (
        <View>
            <TitleAppbar appName={appName} onOpenDrawer={openDrawer} onAddVC={addVC} />
            {props.children}
        </View>
    );
};

export default MainView;
