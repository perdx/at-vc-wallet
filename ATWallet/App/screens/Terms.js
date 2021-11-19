import React, { useState } from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { Button, Card, Switch, Paragraph, Title } from 'react-native-paper';

import LogoHeader from '../components/views/LogoHeader';
import SafeAreaScrollView from '../components/views/SafeAreaScrollView';

const Terms = props => {
    const { navigation } = props;
    const [checked, setChecked] = useState(false);

    return (
        <SafeAreaScrollView>
            <LogoHeader />
            <Card>
                <Card.Content>
                    <Title>Terms of Service</Title>
                    <Paragraph>Terms of service here</Paragraph>
                    <View style={styles.switch}>
                        <Switch
                            value={checked}
                            onValueChange={() => setChecked(!checked)}
                        />
                        <Text style={styles.label}>I agree</Text>
                    </View>
                    <Button
                        mode="contained"
                        disabled={!checked}
                        onPress={() => navigation.navigate('Create Pin')}
                    >
                        OK
                    </Button>
                </Card.Content>
            </Card>
        </SafeAreaScrollView>
    );
};

export default Terms;

const styles = StyleSheet.create({
    switch: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    label: {
        paddingLeft: 16,
    },
});
