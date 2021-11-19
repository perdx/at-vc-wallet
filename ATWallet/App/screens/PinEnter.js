import React, { useState } from 'react';

import { Alert, Keyboard } from 'react-native';
import * as Keychain from 'react-native-keychain';
import { Button, TextInput } from 'react-native-paper';

import SafeAreaScrollView from '../components/views/SafeAreaScrollView';

const nDigits = 4; // Demo only. Should realy be 6.

const PinEnter = props => {
    const { route } = props;
    const [pin, setPin] = useState('');

    const checkPin = async (p) => {
        const kcEntry = await Keychain.getGenericPassword({ service: 'passcode' });
        if (kcEntry && JSON.stringify(p) === kcEntry.password) {
            route.params.setAuth(true);
        } else {
            Alert.alert('Incorrect PIN');
        }
    };

    return (
        <SafeAreaScrollView>
            <TextInput
                mode="outlined"
                label="Enter PIN"
                placeholder={`${nDigits}-digit PIN`}
                maxLength={nDigits}
                keyboardType="numeric"
                secureTextEntry={true}
                value={pin}
                onChangeText={(p) => {
                    setPin(p);
                    if (p.length === nDigits) {
                        Keyboard.dismiss();
                    }
                }}
            />
            <Button
                mode="contained"
                onPress={() => {
                    Keyboard.dismiss();
                    checkPin(pin);
                }}
            >
                Enter
            </Button>
        </SafeAreaScrollView>
    );
};

export default PinEnter;
