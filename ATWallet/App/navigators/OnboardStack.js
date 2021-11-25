import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Welcome from '../screens/Onboard/Welcome';
import { useOnboard } from '../providers/OnboardProvider';

const Stack = createStackNavigator();

// No onboard request - load Welcome screen
// Rejected onboard request - load Rejected screen
// otherwise pending - load Status screen

const OnboardStack = () => {
    const { onboard } = useOnboard();
    console.log('onboard:', onboard);

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Welcome" component={Welcome} />
        </Stack.Navigator>
    );
};

export default OnboardStack;
