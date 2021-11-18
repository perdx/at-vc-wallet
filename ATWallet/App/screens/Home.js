import React from 'react';

import { Button } from 'react-native-paper';

import Screen from './Screen';

const Home = (props) => {
    const { navigation } = props;
    return (
        <Screen>
            <Button mode="contained" onPress={() => navigation.navigate('Credentials')}>
                View Credentials
            </Button>
        </Screen>
    );
};


export default Home;
