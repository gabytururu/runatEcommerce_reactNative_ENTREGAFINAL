import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Header from '../components/Header'
import ProfileScreen from '../Screens/ProfileScreen'
import ProfileImageSelectorScreen from '../Screens/ProfileImageSelectorScreen'


const Stack = createNativeStackNavigator()

const ProfileNavigator = () => {
  return (
    <Stack.Navigator
        initialRouteName= "profile"
        screenOptions={
            ({navigation, route}) => ({
                header: () => <Header title={route.name} navigation={navigation}/>
            })
        }
    >
        <Stack.Screen
            name="profile"
            component={ProfileScreen}
            options={{title: "My Profile"}}
        />
        <Stack.Screen
            name="profilePictureSelection"
            component={ProfileImageSelectorScreen}
            options={{title: "My Profile Picture"}}
        />

    </Stack.Navigator>
  )
}

export default ProfileNavigator

