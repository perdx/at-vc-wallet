import React from 'react';

import { ActivityIndicator, useTheme } from 'react-native-paper';

import StdView from '../../components/views/StdView';

const Loading = (props) => {
    const { colors } = useTheme();

    return (
        <StdView>
            <ActivityIndicator animating={true} color={colors.accent} />
        </StdView>
    );
};

export default Loading;
