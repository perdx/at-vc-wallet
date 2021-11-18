import React from 'react';

import { View, StyleSheet } from 'react-native';

const Screen = props => {
    return (
        <View style={styles.container}>
            {props.children}
        </View>
    );
};

export default Screen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
