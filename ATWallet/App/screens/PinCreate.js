import React, { useState } from 'react';
import { Alert, Keyboard, StyleSheet, View } from 'react-native';
import * as Keychain from 'react-native-keychain';
import { Button, TextInput } from 'react-native-paper';

import SafeAreaScrollView from '../components/views/SafeAreaScrollView';
import { useAuth } from '../providers/AuthProvider';

// TODO: (Short term) Make this more PIN-like with separate inputs for each digit.
// TODO: Augment with native phone auth like fingerprint or face recognition.

const nDigits = 4; // Demo only. Should realy be 6.

const PinCreate = props => {
    const auth = useAuth();
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
            auth.setAuth(true);
        }
    };

    return (
        <SafeAreaScrollView>
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
                    style={styles.input}
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
                    style={styles.input}
                />
            </View>
            <View style={styles.row}>
                <Button
                    mode="contained"
                    onPress={() => {
                        Keyboard.dismiss();
                        confirmEntry(pin, pin2);
                    }}
                    style={styles.button}
                >
                    Create
                </Button>
            </View>
        </SafeAreaScrollView>
    );
};

export default PinCreate;

const styles = StyleSheet.create({
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'stretch',
    },
    input: {
        width: 200,
        marginTop: 24,
    },
    button: {
        marginTop: 16,
    },
});
