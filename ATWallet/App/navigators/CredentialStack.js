import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import OnboardStack from './OnboardStack';
import TitleAppbar from '../components/views/TitleAppbar';
import { useCredentials } from '../providers/CredentialProvider';
import OnboardProvider from '../providers/OnboardProvider';
import CredentialList from '../screens/CredentialList';

const Stack = createStackNavigator();

// If there are existing credentials, load the credential screens, otherwise
// load the onboarding stack to invite the user to onboard or check their
// onboarding status.

const CredentialStack = () => {

    const { credentials } = useCredentials();
    console.log('credentials:', credentials);

    const hasCredentials = credentials && credentials.length > 0;

    return (
        <OnboardProvider>
            <Stack.Navigator
                screenOptions={
                    hasCredentials ? ({ header: (props) => <TitleAppbar {...props} /> }) : ({ headerShown: false })
                }
            >
                {hasCredentials ? (
                    <Stack.Screen name="CredentialList" component={CredentialList} options={{ title: 'AT Wallet' }} />
                ) : (
                    <Stack.Screen name="Onboard" component={OnboardStack} />
                )}
            </Stack.Navigator>
        </OnboardProvider>
    );
};

export default CredentialStack;
