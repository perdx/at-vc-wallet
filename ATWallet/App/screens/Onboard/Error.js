import React from 'react';

import { StyleSheet } from 'react-native';
import { Button, Paragraph } from 'react-native-paper';

import StdView from '../../components/views/StdView';
import { useOnboard } from '../../providers/OnboardProvider';

const Error = (props) => {
    const { reset } = useOnboard();
    return (
        <StdView>
            <Paragraph style={styles.p}>We are unable to determine the status{'\n'}of your credential application right now.</Paragraph>
            <Paragraph style={styles.p}>Please check again soon.</Paragraph>
            <Button mode="contained" onPress={reset} style={styles.button}>OK</Button>
        </StdView>
    );
};

export default Error;

const styles = StyleSheet.create({
    p: {
        textAlign: 'center',
    },
    button: {
        marginTop: 16,
    },
});
