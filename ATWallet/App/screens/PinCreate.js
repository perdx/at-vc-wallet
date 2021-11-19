import React, { useState } from 'react';
import { Alert, Keyboard, StyleSheet, View } from 'react-native';
import * as Keychain from 'react-native-keychain';
import { Button, TextInput } from 'react-native-paper';

import { SaveAreaScrollView } from '../components/views/SafeAreaScrollView';

// TODO: (Short term) Make this more PIN-like with separate inputs for each digit.
// TODO: Augment with native phone auth like fingerprint or face recognition.

const nDigits = 4; // Demo only. Should realy be 6.

const PinCreate = props => {
    const { route } = props;
    const [pin, setPin] = useState('');
    const [pin2, setPin2] = useState('');

    const createPasscode = async (p) => {
        const passcode = JSON.stringify(p);
        const description = 'user authentication pin';
        await Keychain.setGenericPassword(description, passcode, { service: 'passcode' });
    };

    const confirmEntry = (p1, p2) => {
        if (p1.length < 4 || p2.length < nDigits) {
            Alert.alert(`PIN must be ${nDigits} digits`);
        } else if (p1 !== p2) {
            Alert.alert('PINs do not match');
        } else {
            createPasscode(p1);
            route.params.setAuth(true);
        }
    };

    return (
        <SaveAreaScrollView>
            <View style={styles.row}>
                <TextInput
                    mode="outlined"
                    label="Enter PIN"
                    placeholder={`${nDigits}-digit PIN`}
                    maxLength={nDigits}
                    keyboardType="numeric"
                    secureTextEntry={true}
                    value={pin}
                    onChangeText={setPin}
                />
            </View>
            <View style={styles.row}>
                <TextInput
                    mode="outlined"
                    label="Confirm PIN"
                    placeholder={`${nDigits}-digit PIN`}
                    maxLength={nDigits}
                    keyboardType="numeric"
                    secureTextEntry={true}
                    value={pin2}
                    onChangeText={(t) => {
                        setPin2(t);
                        if (t.length === nDigits) {
                            Keyboard.dismiss();
                        }
                    }}
                />
            </View>
            <View style={styles.row}>
                <Button
                    mode="contained"
                    onPress={() => {
                        Keyboard.dismiss();
                        confirmEntry(pin, pin2);
                    }}
                >
                    Create
                </Button>
            </View>
        </SaveAreaScrollView>
    );
};

export default PinCreate;

const styles = StyleSheet.create({
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'stretch',
        margin: '8px 24px 8px 24px',
    },
});
