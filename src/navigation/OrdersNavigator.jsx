import { StyleSheet } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Header from '../components/Header'
import OrdersScreen from '../Screens/OrdersScreen'
import React from 'react'

const Stack = createNativeStackNavigator()

const OrdersNavigator = () => {
  return (
    <Stack.Navigator
        initialRouteName= "orders"
        screenOptions={
            ({navigation, route}) => ({
                header: () => <Header title={route.name} navigation={navigation}/>
            })
        }
    >
        <Stack.Screen
            name="Orders"
            component={OrdersScreen}
            options={{title: "Tus Compras"}}
        />

    </Stack.Navigator>
  )
}

export default OrdersNavigator
const styles = StyleSheet.create({})