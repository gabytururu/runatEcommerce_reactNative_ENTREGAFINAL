import { StyleSheet } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Header from '../components/Header'
import CartScreen from '../Screens/CartScreen'
import React from 'react'

const Stack = createNativeStackNavigator()

const CartNavigator = () => {
  return (
    <Stack.Navigator
        initialRouteName= "carrito"
        screenOptions={
            ({navigation, route}) => ({
                header: () => <Header title={route.name} navigation={navigation}/>
            })
        }
    >
        <Stack.Screen
            name="carrito"
            component={CartScreen}
            options={{title: "Mi Carrito"}}
        />

    </Stack.Navigator>
  )
}

export default CartNavigator

const styles = StyleSheet.create({})