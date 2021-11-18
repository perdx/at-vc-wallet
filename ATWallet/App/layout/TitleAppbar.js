import React from 'react';

import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';

const TitleAppbar = (props) => {
    const { back, navigation, options } = props;

    return (
        <Appbar.Header style={styles.header}>
            {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
            <Appbar.Action icon="menu" />
            <Appbar.Content title={options.title} />
            <Appbar.Action icon="plus-thick" />
        </Appbar.Header>
    );
};

export default TitleAppbar;

const styles = StyleSheet.create({
    header: {
        elevation: 0,
    },
});
