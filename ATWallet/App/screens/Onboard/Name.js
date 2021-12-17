import React, { useState } from 'react';

import { Alert, Keyboard, StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

import { formStyles } from '../../components/formStyles';
import SafeAreaScrollView from '../../components/views/SafeAreaScrollView';
import { useOnboard } from '../../providers/OnboardProvider';

const Name = (props) => {
    const { navigation } = props;
    const [givenName, setGivenName] = useState('');
    const [familyName, setFamilyName] = useState('');
    const onboard = useOnboard();

    const handleSubmit = () => {
        if (givenName.trim().length === 0) {
            Alert.alert('Your given name is required');
            return;
        }
        if (familyName.trim().length === 0) {
            Alert.alert('Your family name is required');
            return;
        }
        Keyboard.dismiss();
        // TODO: Expand for whatever onboarding fields we need
        onboard.create({ givenName: givenName.trim(), familyName: familyName.trim() });
        navigation.navigate('OnboardStatus');
    };

    return (
        <SafeAreaScrollView>
            <View style={styles.row}>
                <TextInput
                    mode="outlined"
                    label="Given Name"
                    maxLength={30}
                    keyboardType="default"
                    value={givenName}
                    onChangeText={setGivenName}
                    style={styles.input}
                />
            </View>
            <View style={styles.row}>
                <TextInput
                    mode="outlined"
                    label="Family Name"
                    maxLength={30}
                    keyboardType="default"
                    value={familyName}
                    onChangeText={setFamilyName}
                    style={styles.input}
                />
            </View>
            <View style={styles.row}>
                <Button
                    mode="contained"
                    onPress={handleSubmit}
                    style={styles.button}
                >
                    Submit
                </Button>
            </View>
        </SafeAreaScrollView>
    );
};

export default Name;

const styles = StyleSheet.create({ ...formStyles() });
