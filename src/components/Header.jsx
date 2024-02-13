import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors } from '../global/colors'
import { AntDesign, Entypo } from '@expo/vector-icons'; 
import { useSelector, useDispatch } from 'react-redux';
import { setUserLogout } from '../features/authSlice';
import { deleteSession } from '../db';


const Header = ({title, navigation}) => {

  const user =  useSelector(state=>state.authReducer.user)
  const localId = useSelector(state=>state.authReducer.localId)

  const dispatch = useDispatch()
  const handleLogout = () =>{
    dispatch(setUserLogout())
    const deletedSession = deleteSession(localId)
    console.log('La session ha sido borrada:', deletedSession)
  }

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerTextContainer}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
      { user && 
        <View style={styles.navButtonsContainer}>
          <TouchableOpacity onPress={handleLogout} style={styles.navButton}>
            <AntDesign name="logout" size={20} color="white"/>
          </TouchableOpacity>
        </View>
      }
      {navigation.canGoBack()?
        <>
          <View style={styles.navButtonsContainer}>
            <TouchableOpacity onPress={navigation.goBack} style={styles.navButton}>
              <AntDesign name="caretleft" size={20} color= "white"/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('categories')} style={styles.navButton}>
              <Entypo name="home" size={20} color= "white"/>
            </TouchableOpacity>
          </View> 
        </>
          :
        <View></View>
      }
     
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  headerContainer:{
    flexDirection: 'row-reverse',   
    height: 100,
    backgroundColor: colors.dark,
    borderBottomColor: colors.secondary,
    borderBottomWidth: 5,
    padding: 15,
    marginTop:0,
    alignItems:'center',
    justifyContent: 'center',
    },
  headerTextContainer:{
    width: '70%',
    padding: 15
  },
  headerText:{    
    textAlign: 'right',
    color: colors.clear,
    color: 'white',
    fontFamily: 'MeowScript',
    fontSize: 35,
    textTransform: 'capitalize'
  },
  navButtonsContainer:{
    flexDirection:'row',
    justifyContent: 'space-evenly',
  },
  navButton:{
    padding:10
  }
})