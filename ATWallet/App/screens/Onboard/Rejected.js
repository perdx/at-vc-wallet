import React from 'react';

import { StyleSheet } from 'react-native';
import { Button, Paragraph } from 'react-native-paper';

import StdView from '../../components/views/StdView';
import { useOnboard } from '../../providers/OnboardProvider';

const Rejected = (props) => {
    const { reset } = useOnboard();
    return (
        <StdView>
            <Paragraph style={styles.p}>Unfortunately we were unable{'\n'}to verify your details.</Paragraph>
            <Paragraph style={styles.p}>Please try again or contact us for more information.</Paragraph>
            <Button mode="contained" onPress={reset} style={styles.button}>OK</Button>
        </StdView>
    );
};

export default Rejected;

// TODO: This is copied and pasted in several places. Create standard components.

const styles = StyleSheet.create({
    p: {
        textAlign: 'center',
    },
    button: {
        marginTop: 16,
    },
});
