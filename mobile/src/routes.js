import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

import SelectProvider from './pages/New/SelectProvider';
import SelectDateTime from './pages/New/SelectDateTime';
import Confirm from './pages/New/Confirm';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function Routes() {
    const signed = useSelector((state) => state.auth.signed);

    return (
        <NavigationContainer>
            {signed ? (
                <Tab.Navigator
                    initialRouteName="Dashboard"
                    tabBarOptions={{
                        keyboardHidesTabBar: true,
                        activeTintColor: '#fff',
                        inactiveTintColor: 'rgba(255, 255, 255, 0.4)',
                        style: {
                            backgroundColor: '#8d41a8',
                            borderTopWidth: 0,
                        },
                        tabStyle: { marginBottom: 3 },
                    }}
                >
                    <Tab.Screen
                        name="Dashboard"
                        component={Dashboard}
                        options={Dashboard.navigationOptions}
                    />
                    <Tab.Screen
                        name="New"
                        options={{
                            tabBarVisible: false,
                            tabBarLabel: 'Agendar',
                            tabBarIcon: ({ color, size }) => (
                                <Icon
                                    name="add-circle-outline"
                                    size={size}
                                    color={color}
                                />
                            ),
                        }}
                    >
                        {() => (
                            <Stack.Navigator
                                initialRouteName="SelectProvider"
                                screenOptions={{
                                    headerTransparent: true,
                                    headerTintColor: '#fff',
                                    headerTitleAlign: 'center',
                                    headerLeftContainerStyle: {
                                        marginLeft: 20,
                                    },
                                }}
                            >
                                <Stack.Screen
                                    name="SelectProvider"
                                    component={SelectProvider}
                                    options={SelectProvider.navigationOptions}
                                />
                                <Stack.Screen
                                    name="SelectDateTime"
                                    component={SelectDateTime}
                                    options={SelectDateTime.navigationOptions}
                                />
                                <Stack.Screen
                                    name="Confirm"
                                    component={Confirm}
                                    options={Confirm.navigationOptions}
                                />
                            </Stack.Navigator>
                        )}
                    </Tab.Screen>
                    <Tab.Screen
                        name="Profile"
                        component={Profile}
                        options={Profile.navigationOptions}
                    />
                </Tab.Navigator>
            ) : (
                <Stack.Navigator
                    initialRouteName="SignIn"
                    screenOptions={{ headerShown: false }}
                >
                    <Stack.Screen name="SignIn" component={SignIn} />
                    <Stack.Screen name="SignUp" component={SignUp} />
                </Stack.Navigator>
            )}
        </NavigationContainer>
    );
}
