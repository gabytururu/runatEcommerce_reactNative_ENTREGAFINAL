import { StyleSheet } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HeaderAuth from '../components/HeaderAuth'
import LoginScreen from '../Screens/LoginScreen'
import SignupScreen from '../Screens/SignupScreen'

const Stack = createNativeStackNavigator()

const AuthNavigator = () => {
  return (
    <Stack.Navigator
        initialRouteName= "Login"
        screenOptions={
            ({navigation, route}) => ({
                header: () => <HeaderAuth title={route.name} navigation={navigation}/>
            })
        }
    >
        <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{title: "Login-Ingreso"}}
        />
        <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{title: "Signup-Registro"}}
        />
    </Stack.Navigator>
  )
}

export default AuthNavigator

const styles = StyleSheet.create({})