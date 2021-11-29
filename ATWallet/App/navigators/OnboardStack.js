import React, { useEffect } from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import TitleAppbar from '../components/views/TitleAppbar';
import Loading from '../screens/Onboard/Loading';
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
    const { navigation } = props;
    const onboard = useOnboard();
    console.log('onboard.state:', onboard.state);

    useEffect(() => {
        if (onboard.state.id === null && onboard.state.loading) {
            navigation.navigate('Loading');
            return;
        }
        if (onboard.state.id === null) {
            navigation.navigate('Welcome');
            return;
        }
        if (onboard.state.status === 'declined') {
            navigation.navigate('OnboardRejected');
            return;
        }
        navigation.navigate('OnboardStatus');
    }, [onboard.state, navigation]);

    return (
        <Stack.Navigator screenOptions={{ header: (headerProps) => <TitleAppbar {...headerProps} /> }}>
            <Stack.Screen name="Loading" component={Loading} options={{ title: 'Please wait...' }} />
            <Stack.Screen name="Welcome" component={Welcome} options={{ title: 'Welcome' }} />
            <Stack.Screen name="OnboardName" component={Name} options={{ title: 'Your Name' }} />
            <Stack.Screen name="OnboardStatus" component={Status} options={{ title: 'Pending Requests', preventBack: true }} />
            <Stack.Screen name="OnboardRejected" component={Rejected} options={{ title: 'Unsuccessful', preventBack: true }} />
        </Stack.Navigator>
    );
};

export default OnboardStack;
