import React from 'react';

import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';

const TitleAppbar = (props) => {
    const { back, navigation, options } = props;

    return (
        <Appbar.Header style={styles.header}>
            {(back && !options.preventBack) ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
            <Appbar.Content title={options.title} />
        </Appbar.Header>
    );
};

export default TitleAppbar;

const styles = StyleSheet.create({
    header: {
        elevation: 0,
    },
});
