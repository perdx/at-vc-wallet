import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import OnboardStack from './OnboardStack';
import { useCredentials } from '../providers/CredentialProvider';
import CredentialList from '../screens/CredentialList';

const Stack = createStackNavigator();

const CredentialStack = () => {
    const { credentials } = useCredentials();

    const hasCredentials = credentials && credentials.length > 0;

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {hasCredentials ? (
                <Stack.Screen name="CredentialList" component={CredentialList} />
            ) : (
                <Stack.Screen name="Onboard" component={OnboardStack} />
            )}
        </Stack.Navigator>
    );
};

export default CredentialStack;
