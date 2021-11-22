import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Home from '../screens/Home';
import CredentialsList from '../screens/CredentialsList';
import TitleAppbar from '../components/views/TitleAppbar';

const Tab = createBottomTabNavigator();

const MainStack = () => {
    const theme = useTheme();

    const routes = {
        Home: {
            iconName: 'home',
            component: <Home />,
            title: 'AT Wallet',
        },
        Credentials: {
            iconName: 'collections-bookmark',
            component: <CredentialsList />,
            title: 'Credentials',
        },
    };
    const routeKeys = Object.keys(routes);

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                header: (props) => <TitleAppbar {...props} />,
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
                    options={{
                        title: routes[k].title,
                        tabBarLabel: routes[k].title,
                    }}>
                    {() => routes[k].component}
                </Tab.Screen>
            )}
        </Tab.Navigator>
    );
};

export default MainStack;
