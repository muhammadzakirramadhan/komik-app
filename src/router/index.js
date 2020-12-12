import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Landing from '../screens/Landing'
import Home from '../screens/home/Home'
import Search from '../screens/home/Search'
import DetailKomik from '../screens/detail/DetailKomik'
import Chapter from '../screens/read/Chapter'
import Icon from 'react-native-vector-icons/Feather'

const Stack = createStackNavigator()

const Tab = createBottomTabNavigator()

const HomeRoute = () => {
    return (
        <Tab.Navigator tabBarOptions={{style: {height: 60}, tabStyle: {paddingTop: 10}}}>
            <Tab.Screen component={Home} name='Beranda' options={{
                tabBarLabel: '',
                tabBarIcon: ({color, size}) => (
                    <Icon name='home' color={color} size={size}></Icon>
                )
            }}></Tab.Screen>
            <Tab.Screen component={Search} name='Pencarian' options={{
                tabBarLabel: '',
                tabBarIcon: ({color, size}) => (
                    <Icon name='search' color={color} size={size}></Icon>
                )
            }}></Tab.Screen>
        </Tab.Navigator>
    )
}

const Routes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator headerMode={false} initialRouteName='Landing'>
                <Stack.Screen name='Landing' component={Landing}></Stack.Screen>
                <Stack.Screen name='Home' component={HomeRoute}></Stack.Screen>
                <Stack.Screen name='DetailKomik' component={DetailKomik} options={{title:'Detail Komik'}}></Stack.Screen>
                <Stack.Screen name='Chapter' component={Chapter}></Stack.Screen>
                <Stack.Screen name='Searching' component={HomeRoute}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes
