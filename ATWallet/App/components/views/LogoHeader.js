import React from 'react';
import { View, StyleSheet } from 'react-native';

import ATLogo from '../../../assets/ATLogo';

const LogoHeader = () => {
    return (
        <View style={styles.container}>
            <ATLogo width="100" height="100" />
        </View>
    );
};

export default LogoHeader;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: 24,
    },
});
