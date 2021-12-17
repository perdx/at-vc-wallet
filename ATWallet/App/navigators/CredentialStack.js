import React, { useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import OnboardStack from './OnboardStack';
import TitleAppbar from '../components/views/TitleAppbar';
import { useCredentials } from '../providers/CredentialProvider';
import OnboardProvider from '../providers/OnboardProvider';
import CredentialList from '../screens/CredentialList';
import Loading from '../screens/Loading';

const Stack = createStackNavigator();

const CredentialStack = () => {
    const navigation = useNavigation();
    const { state, getVC, issuanceState, load } = useCredentials();

    // Navigation effect
    useEffect(() => {
        if (state.loading) {
            navigation.navigate('CredentialLoading');
            return;
        }
        if (!state.credentials || state.credentials.length === 0) {
            navigation.navigate('Onboard');
            return;
        }
        navigation.navigate('CredentialList');
    }, [state.loading, state.credentials, navigation]);

    // Initialisation effect
    useEffect(() => {
        if (state.startup && !state.loading) {
            load();
        }
    }, [state.startup, state.loading, load]);

    useEffect(() => {
        if (state.issuanceStatus !== 'requested') {
            return;
        }
        issuanceState();
    }, [state.issuanceStatus, issuanceState]);

    // Retrieve VC effect when issuance is ready
    useEffect(() => {
        if ((state.issuance === null) || (state.issuanceStatus !== 'awaiting_issuance')) {
            return;
        }
        getVC(state.issuance.url);
    }, [state.issuance, state.issuanceStatus, getVC]);

    const hasCredentials = state.credentials && state.credentials.length > 0;

    return (
        <OnboardProvider>
            <Stack.Navigator
                screenOptions={
                    hasCredentials ? ({ header: (headerProps) => <TitleAppbar {...headerProps} /> }) : ({ headerShown: false })
                }
            >
                <Stack.Screen name="CredentialLoading" component={Loading} options={{ title: 'Please wait...', preventBack: true }} />
                <Stack.Screen name="Onboard" component={OnboardStack} />
                <Stack.Screen name="CredentialList" component={CredentialList} options={{ title: 'AT Wallet' }} />
            </Stack.Navigator>
        </OnboardProvider>
    );
};

export default CredentialStack;
