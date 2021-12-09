import React from 'react';

import { StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';

import StdView from '../../components/views/StdView';
import ATLogo from '../../../assets/ATLogo';
import { useOnboard } from '../../providers/OnboardProvider';
import { useCredentials } from '../../providers/CredentialProvider';

const Status = (props) => {
    const { navigation } = props;
    const { state, check } = useOnboard();
    const { issuance } = useCredentials();

    const handleGetVC = async () => {
        await issuance();
        navigation.navigate('CredentialList');
    };

    return (
        <StdView>
            <ATLogo width="60" height="60" style={styles.item} />
            {(state.status === 'issued') ? (<>
                <Text style={styles.item}>Your ID has been validated and approved.</Text>
                <Text>Tap to add your ID to this wallet.</Text>
                <Button
                    icon="file-certificate"
                    mode="contained"
                    onPress={handleGetVC}
                    style={styles.item}
                >
                    Add to Wallet
                </Button>
            </>) : (<>
                <Text style={styles.item}>Your ID is being validated.</Text>
                <Button
                    icon="refresh"
                    mode="contained"
                    onPress={check}
                    style={styles.item}
                >
                    Check Again
                </Button>
            </>)}
        </StdView>
    );
};

export default Status;

const styles = StyleSheet.create({
    item: {
        marginTop: 24,
    },
});
