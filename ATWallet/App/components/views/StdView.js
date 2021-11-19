import React from 'react';

import { View, StyleSheet } from 'react-native';

const StdView = props => {
    return (
        <View style={styles.container}>
            {props.children}
        </View>
    );
};

export default StdView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
