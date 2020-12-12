import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import Landing from '../screens/Landing'
import Home from '../screens/home/Home'
import DetailKomik from '../screens/detail/DetailKomik'
import Chapter from '../screens/read/Chapter'

const Stack = createStackNavigator()

const Routes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator headerMode={false} initialRouteName='Landing'>
                <Stack.Screen name='Landing' component={Landing}></Stack.Screen>
                <Stack.Screen name='Home' component={Home}></Stack.Screen>
                <Stack.Screen name='DetailKomik' component={DetailKomik} options={{title:'Detail Komik'}}></Stack.Screen>
                <Stack.Screen name='Chapter' component={Chapter}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes
