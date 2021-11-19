import React, { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import * as Keychain from 'react-native-keychain';

import PinCreate from '../screens/PinCreate';
import PinEnter from '../screens/PinEnter';
import Terms from '../screens/Terms';

const Stack = createStackNavigator();

const AuthStack = (props) => {
    const { setAuth } = props;
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
        <Stack.Navigator screenOptions={{ presentation: 'transparentModal', headerShown: 'false' }}>
            {firstSignIn ? (
                <Stack.Group>
                    <Stack.Screen name="Terms & Conditions" component={Terms} />
                    <Stack.Screen name="Create Pin" component={PinCreate} initialParams={{ setAuth }} />
                </Stack.Group>
            ) : (
                <Stack.Group>
                    <Stack.Screen name="Enter Pin" component={PinEnter} initialParams={{ setAuth }} />
                </Stack.Group>
            )}
        </Stack.Navigator>
    );
};

export default AuthStack;
