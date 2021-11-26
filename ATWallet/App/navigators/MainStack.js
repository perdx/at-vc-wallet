import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

import CredentialStack from './CredentialStack';
import CredentialProvider from '../providers/CredentialProvider';

const Tab = createBottomTabNavigator();

const MainStack = () => {
    const theme = useTheme();

    const routes = {
        CredentialTab: {
            iconName: 'collections-bookmark',
            component: <CredentialStack />,
            title: 'AT Wallet',
        },
    };
    const routeKeys = Object.keys(routes);

    return (
        <CredentialProvider>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarIcon: ({ focused }) => <Icon
                        name={routes[route.name].iconName}
                        size={32}
                        color={focused ? theme.colors.accent : theme.colors.primary}
                    />,
                    tabBarActiveTintColor: theme.colors.accent,
                    tabBarInactiveTintColor: theme.colors.primary,
                })}
            >
                {routeKeys.map((k) =>
                    <Tab.Screen
                        key={k}
                        name={k}
                        options={{ tabBarLabel: routes[k].title }}>
                        {() => routes[k].component}
                    </Tab.Screen>
                )}
            </Tab.Navigator>
        </CredentialProvider>
    );
};

export default MainStack;
