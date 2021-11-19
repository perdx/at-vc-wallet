/**
 * @format
 */

import React from 'react';
import { AppRegistry } from 'react-native';
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

AppRegistry.registerComponent(appName, () => Main);
