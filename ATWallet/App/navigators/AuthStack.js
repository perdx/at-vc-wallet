import React, { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import * as Keychain from 'react-native-keychain';

import TitleAppbar from '../components/views/TitleAppbar';
import PinCreate from '../screens/PinCreate';
import PinEnter from '../screens/PinEnter';
import Terms from '../screens/Terms';

const Stack = createStackNavigator();

const AuthStack = (props) => {
    const [firstSignIn, setFirstSignIn] = useState(true);

    useEffect(() => {
        const checkFirstSignIn = async () => {
            try {
                const firstLaunch = await AsyncStorage.getItem('firstLaunch');
                const pin = await Keychain.getGenericPassword({ service: 'passcode' });
                if (firstLaunch === null) {
                    await AsyncStorage.setItem('firstLaunch', 'false');
                    await Keychain.resetGenericPassword({ service: 'passcode' });
                } else {
                    if (pin) {
                        setFirstSignIn(false);
                    }
                }
            } catch (e) {
                // TODO: Present meaningful error state
                console.error(e);
            }
        };
        checkFirstSignIn();
    }, []);

    return (
        <Stack.Navigator
            screenOptions={{
                header: (headerProps) => <TitleAppbar {...headerProps} />,
            }}>
            {firstSignIn ? (
                <Stack.Group>
                    <Stack.Screen name="Terms & Conditions" component={Terms} options={{ title: 'Terms & Conditions' }} />
                    <Stack.Screen name="Create PIN" component={PinCreate} options={{ title: 'Create PIN' }} />
                </Stack.Group>
            ) : (
                <Stack.Group>
                    <Stack.Screen name="Enter PIN" component={PinEnter} options={{ title: 'Enter PIN' }} />
                </Stack.Group>
            )}
        </Stack.Navigator>
    );
};

export default AuthStack;
