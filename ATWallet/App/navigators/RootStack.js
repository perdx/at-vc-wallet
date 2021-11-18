import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home';
import ListCredentials from '../screens/ListCredentials';
import TitleAppbar from '../layout/TitleAppbar';

const Stack = createNativeStackNavigator();

const RootStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                header: (props) => <TitleAppbar {...props} />,
            }}
        >
            <Stack.Screen name="Home" component={Home} options={{ title: 'Welcome' }} />
            <Stack.Screen name="Credentials" component={ListCredentials} options={{ title: 'Credentials' }} />
        </Stack.Navigator>
    );
};

export default RootStack;
