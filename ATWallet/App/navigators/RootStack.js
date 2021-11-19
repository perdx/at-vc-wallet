import React, { useState } from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import AuthStack from './AuthStack';
import MainStack from './MainStack';

const Stack = createStackNavigator();

const RootStack = () => {
    const [auth, setAuth] = useState(false);
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            {auth ? (
                <Stack.Screen name="Main" component={MainStack} />
            ) : (
                <Stack.Screen name="Auth" options={{ presentation: 'modal' }}>
                    {() => <AuthStack setAuth={setAuth} />}
                </Stack.Screen>
            )}
        </Stack.Navigator>
    );
};

export default RootStack;
