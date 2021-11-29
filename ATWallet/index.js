/**
 * @format
 */

import React from 'react';
import { AppRegistry, LogBox } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';

import App from './App';
import { name as appName } from './app.json';
import { theme } from './App/theme';

const Main = () => {
    return (
        <PaperProvider theme={theme}>
            <NavigationContainer>
                <App />
            </NavigationContainer>
        </PaperProvider>
    );
};

// Ignore fetch require loop warning https://github.com/facebook/metro/issues/287
LogBox.ignoreLogs(['Require cycle:']);

AppRegistry.registerComponent(appName, () => Main);
