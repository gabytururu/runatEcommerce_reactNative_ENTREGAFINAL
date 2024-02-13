import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CategoriesScreen from '../Screens/CategoriesScreen'
import ProductDetailScreen from '../Screens/ProductDetailScreen'
import ProductsByCatScreen from '../Screens/ProductsByCatScreen'

import Header from '../components/Header'

const Stack = createNativeStackNavigator()

const ShopNavigator = () => {
  return (
        <Stack.Navigator
            initialRouteName='categories'
            screenOptions={
                ({navigation,route}) =>({
                    header: () => {                     
                        return <Header title={route.name} navigation={navigation}/>
                    } 
                })
            }
        >            
            <Stack.Screen
                name='categories'
                component={CategoriesScreen}
              
            />
            <Stack.Screen
                name='productsByCategory'
                component={ProductsByCatScreen}
              
            />
            <Stack.Screen
                name='productDetails'
                component={ProductDetailScreen}
              
            />
        </Stack.Navigator>
  )
}

export default ShopNavigator
