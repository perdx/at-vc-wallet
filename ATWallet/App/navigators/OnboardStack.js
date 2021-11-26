import React, { useEffect, useState } from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import TitleAppbar from '../components/views/TitleAppbar';
import Name from '../screens/Onboard/Name';
import Rejected from '../screens/Onboard/Rejected';
import Status from '../screens/Onboard/Status';
import Welcome from '../screens/Onboard/Welcome';
import { useOnboard } from '../providers/OnboardProvider';

const Stack = createStackNavigator();

// No onboard request - load Welcome screen
// Rejected onboard request - load Rejected screen
// otherwise pending - load Status screen

const OnboardStack = () => {
    const onboard = useOnboard();
    console.log('onboard.state:', onboard.state);
    const [mode, setMode] = useState('create');

    useEffect(() => {
        if (onboard.state.id === null) {
            setMode('Welcome');
            return;
        }
        if (onboard.state.status === 'declined') {
            setMode('OnboardRejected');
            return;
        }
        setMode('OnboardStatus');
    }, [onboard.state]);

    return (
        <Stack.Navigator initialRouteName={mode} screenOptions={{ header: (props) => <TitleAppbar {...props} /> }}>
            <Stack.Screen name="Welcome" component={Welcome} options={{ title: 'Welcome' }} />
            <Stack.Screen name="OnboardName" component={Name} options={{ title: 'Your Name' }} />
            <Stack.Screen name="OnboardStatus" component={Status} options={{ title: 'Pending Requests', preventBack: true }} />
            <Stack.Screen name="OnboardRejected" component={Rejected} options={{ title: 'Unsuccessful', preventBack: true }} />
        </Stack.Navigator>
    );
};

export default OnboardStack;
