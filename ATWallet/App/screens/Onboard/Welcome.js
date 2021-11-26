import React from 'react';

import { StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import StdView from '../../components/views/StdView';
import ATLogo from '../../../assets/ATLogo';

const Welcome = (props) => {
    const { navigation } = props;
    return (
        <StdView>
            <ATLogo width="60" height="60" style={styles.item} />
            <Text style={styles.item}>To create your ID</Text>
            <Text>we're going to need a few details...</Text>
            <Button
                icon="arrow-right-thick"
                mode="contained"
                onPress={() => navigation.navigate('OnboardName')}
                style={styles.item}
            >
                Start
            </Button>
        </StdView>
    );
};

export default Welcome;

const styles = StyleSheet.create({
    item: {
        marginTop: 24,
    },
});
