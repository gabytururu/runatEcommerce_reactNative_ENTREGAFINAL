import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import user_data from '../data/user_data.json'
import { colors } from '../global/colors'
import { useSelector } from 'react-redux'
import LocationSelector from '../components/LocationSelector'

const ProfileScreen = ({navigation}) => {
    const image = useSelector(state=>state.authReducer.profilePicture)

  return (
    <>
    <View style={styles.mainContainer}>
        <View style={styles.profileContainer}>
            <Pressable onPress={()=> navigation.navigate('profilePictureSelection')} style={({pressed})=>[{backgroundColor:pressed? colors.secondary : colors.primary}, styles.pictureContainer,]}>
                {
                    image ?
                   <Image
                    source={{uri:image}}
                    style={styles.profilePicture}
                    resizeMode='contain'
                   >
                   </Image>
                    :
                    <Image
                        source={require('../../assets/img/user.png')}
                        style={styles.profilePicture}
                        resizeMode='contain'
                    ></Image>
                }
            </Pressable>
            <View style={styles.userDataContainer}>
                <Text style={styles.userMainData}>{user_data.name}</Text>
                <Text style={styles.userMainData}>{user_data.role}</Text>
                <Text style={styles.userData}>Nivel:{user_data.level}</Text>
                <Text style={styles.userData}>Dirección:{user_data.address}</Text>
                <Text style={styles.userData}>{user_data.city}</Text>
            </View>      
        </View>
        <View style={styles.locationContainer}>
            <LocationSelector/>
        </View>
    </View>
    
    </>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
    mainContainer:{
        backgroundColor: colors.lightYellow,
        flex:1,
        overflow:'hidden'
    },
    profileContainer:{
        borderRadius:8,
        flexDirection:'row',
        alignItems:'center',
        gap:10,
        backgroundColor:colors.primary,
        margin: 15,
        padding:15,
        borderRadius:10
    },
    profilePicture:{
        width:160,
        height:160,     
        borderRadius:100,   
    },
    userDataContainer:{
        flex:1
    },
    userMainData:{
        fontFamily: 'Poppins-SemiBold',
        fontSize:19,
        color: colors.clear
    },
    userData:{
        fontFamily: 'Poppins-Regular',
        fontSize:18,
        color: colors.clear
    },
    locationContainer:{
        backgroundColor: colors.secondary,
        flex:1,
        marginHorizontal: 15,
        marginBottom:10,
        borderRadius:8,
        padding:10
    }
})