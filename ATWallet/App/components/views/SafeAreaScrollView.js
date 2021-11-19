import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';

import { useTheme } from 'react-native-paper';

const SafeAreaScrollView = props => {
    const theme = useTheme();

    return (
        <SafeAreaView style={styles(theme).container}>
            <ScrollView contentContainerStyle={styles.ScrollView}>
                {props.children}
            </ScrollView>
        </SafeAreaView>
    );
};

export default SafeAreaScrollView;

const styles = theme => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.surface,
    },
    scrollView: {
        alignItems: 'center',
    },
});
