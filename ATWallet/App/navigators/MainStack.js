import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home';
import CredentialsList from '../screens/CredentialsList';
import TitleAppbar from '../components/views/TitleAppbar';

const Stack = createStackNavigator();

const MainStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                header: (props) => <TitleAppbar {...props} />,
            }}
        >
            <Stack.Screen name="Home" component={Home} options={{ title: 'Welcome' }} />
            <Stack.Screen name="Credentials" component={CredentialsList} options={{ title: 'Credentials' }} />
        </Stack.Navigator>
    );
};

export default MainStack;
