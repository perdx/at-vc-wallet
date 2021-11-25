import React, { useEffect, useState } from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import AuthStack from './AuthStack';
import MainStack from './MainStack';
import { useAuth } from '../providers/AuthProvider';

const Stack = createStackNavigator();

const RootStack = () => {
    const auth = useAuth();
    const [isAuthenticated, setIsAuthenticated] = useState(auth.state.isAuthenticated);

    useEffect(() => {
        setIsAuthenticated(auth.state.isAuthenticated);
    }, [auth.state.isAuthenticated]);

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            {isAuthenticated ? (
                <Stack.Screen name="Main" component={MainStack} />
            ) : (
                <Stack.Screen name="Auth" options={{ presentation: 'modal' }}>
                    {() => <AuthStack />}
                </Stack.Screen>
            )}
        </Stack.Navigator>
    );
};

export default RootStack;
