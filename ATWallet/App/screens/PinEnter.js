import React, { useState } from 'react';

import { Alert, Keyboard, StyleSheet, View } from 'react-native';
import * as Keychain from 'react-native-keychain';
import { Button, TextInput } from 'react-native-paper';

import { formStyles } from '../components/formStyles';
import SafeAreaScrollView from '../components/views/SafeAreaScrollView';
import { useAuth } from '../providers/AuthProvider';

const nDigits = 4; // Demo only. Should realy be 6.

const PinEnter = props => {
    const auth = useAuth();
    const [pin, setPin] = useState('');

    const checkPin = async (p) => {
        const kcEntry = await Keychain.getGenericPassword({ service: 'passcode' });
        if (kcEntry && JSON.stringify(p) === kcEntry.password) {
            auth.setAuth(true);
        } else {
            Alert.alert('Incorrect PIN');
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
                    onChangeText={(p) => {
                        setPin(p);
                        if (p.length === nDigits) {
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
                        checkPin(pin);
                    }}
                    style={styles.button}
                >
                    Enter
                </Button>
            </View>
        </SafeAreaScrollView>
    );
};

export default PinEnter;

const styles = StyleSheet.create({ ...formStyles(200) });
