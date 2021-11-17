import React from 'react';

import { Text, View } from 'react-native';
import ATLogo from '../assets/ATLogo';

const VCListItem = (props) => {
    const { vcName } = props;

    return (
        <View>
            <ATLogo width="60" height="60" />
            <Text>{vcName}</Text>
        </View>
    );
};

export default VCListItem;
