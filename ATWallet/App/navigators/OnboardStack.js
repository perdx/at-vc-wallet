import React, { useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import TitleAppbar from '../components/views/TitleAppbar';
import Loading from '../screens/Loading';
import Error from '../screens/Onboard/Error';
import Name from '../screens/Onboard/Name';
import Rejected from '../screens/Onboard/Rejected';
import Status from '../screens/Onboard/Status';
import Welcome from '../screens/Onboard/Welcome';
import { useOnboard } from '../providers/OnboardProvider';

const Stack = createStackNavigator();

// No onboard request - load Welcome screen
// Rejected onboard request - load Rejected screen
// otherwise pending - load Status screen

const OnboardStack = (props) => {
    const navigation = useNavigation();
    const { state, check } = useOnboard();

    useEffect(() => {
        if (state.startup && !state.loading) {
            check();
        }
    }, [state.startup, state.loading, check]);

    useEffect(() => {
        console.log('onboard state:', state);
        if (state.loading) {
            navigation.navigate('OnboardLoading');
            return;
        }
        if (state.error !== null) {
            navigation.navigate('OnboardError');
            return;
        }
        if (state.id === null) {
            navigation.navigate('Welcome');
            return;
        }
        if (state.status === 'declined') {
            navigation.navigate('OnboardRejected');
            return;
        }
        navigation.navigate('OnboardStatus');
    }, [state, navigation]);

    return (
        <Stack.Navigator screenOptions={{ header: (headerProps) => <TitleAppbar {...headerProps} /> }}>
            <Stack.Screen name="OnboardLoading" component={Loading} options={{ title: 'Please wait...', preventBack: true }} />
            <Stack.Screen name="OnboardError" component={Error} options={{ title: 'Oops!', preventBack: true }} />
            <Stack.Screen name="Welcome" component={Welcome} options={{ title: 'Welcome' }} />
            <Stack.Screen name="OnboardName" component={Name} options={{ title: 'Your Name' }} />
            <Stack.Screen name="OnboardStatus" component={Status} options={{ title: 'Pending Requests', preventBack: true }} />
            <Stack.Screen name="OnboardRejected" component={Rejected} options={{ title: 'Unsuccessful', preventBack: true }} />
        </Stack.Navigator>
    );
};

export default OnboardStack;
