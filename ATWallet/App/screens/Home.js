import React from 'react';

import { Button } from 'react-native-paper';

import StdView from '../components/views/StdView';

const Home = (props) => {
    const { navigation } = props;
    return (
        <StdView>
            <Button mode="contained" onPress={() => navigation.navigate('Credentials')}>
                View Credentials
            </Button>
        </StdView>
    );
};


export default Home;
