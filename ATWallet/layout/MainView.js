import React from 'react';

import { SafeAreaView } from 'react-native';

import { displayName as appName } from '../app.json';
import TitleAppbar from './TitleAppbar';

const MainView = (props) => {
    return (
        <SafeAreaView>
            <TitleAppbar appName={appName} />
            {props.children}
        </SafeAreaView>
    );
};

export default MainView;
