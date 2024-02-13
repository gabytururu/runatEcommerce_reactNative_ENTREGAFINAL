import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { colors } from '../global/colors';
import * as ImagePicker from 'expo-image-picker'
import { useSelector, useDispatch } from 'react-redux';
import { setProfilePicture } from '../features/authSlice';
import { usePutProfilePictureMutation } from '../services/shopService';

const ProfileImageSelectorScreen = ({navigation}) => {
  
  const [image,setImage]=useState('')

  const verifyCameraPermissions = async() =>{
    const {granted} = await ImagePicker.requestCameraPermissionsAsync()
    if (!granted){
      return false
    }
    return true
  }

  const handlePickImage = async() =>{
    const cameraPermissionsOK = await verifyCameraPermissions()

    if(cameraPermissionsOK){
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect:[1,1],
        base64:true,
        quality:0.5
      })

      if(!result.canceled){
      setImage(`data:image/jpeg;base64,${result.assets[0].base64}`)
      }   
    }else{
      console.log('Los Permisos para acceder a la Cámara fueron Denegados por el Usuario')
    }
  }

  const dispatch = useDispatch()
  const localId = useSelector(state=>state.authReducer.localId)
  const [triggerPutProfilePicture, result] = usePutProfilePictureMutation()
  const handleConfirmImage = () =>{   
    dispatch(setProfilePicture(image))
    triggerPutProfilePicture({image,localId})
    navigation.navigate('profile')
  }

  return (
    <View style={styles.mainContainer}>
      {
        image
        ?
        <View style={styles.pictureContainer}>
          <Image
            source={{uri:image}}
            style={styles.pictureImage}
            resizeMode={"cover"}
          />
          <View style={styles.btnContainer}>
        
            <TouchableOpacity style={styles.button} onPress={handleConfirmImage}>
              <Text style={styles.btnText}>Confirma esta foto</Text>
            </TouchableOpacity>
        
            <TouchableOpacity style={{...styles.button,...styles.btnOtherPic,...styles.btnOtherPicTxt}} onPress={handlePickImage}>
              <Text style={[styles.btnText, styles.clearText]}>Toma otra Foto</Text>
            </TouchableOpacity>           
          </View>
        </View>
        :
        <View style={styles.noImageContainer}>
          <MaterialIcons name="no-photography" size={200} color="#ccc"/>
          <Text style={styles.regularText}>Tu Perfil No tiene Foto</Text>
          <TouchableOpacity style={styles.button} onPress={handlePickImage}>
            <Text style={styles.btnText}>Tomar una Foto</Text>
          </TouchableOpacity>
        </View>
      }
    </View>
  )
}

export default ProfileImageSelectorScreen

const styles = StyleSheet.create({
  mainContainer:{
    backgroundColor:colors.mintSoft,
    flex:1,
    alignItems:'center',
    justifyContent:'center',
   
  },
  pictureContainer:{
    backgroundColor:colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:15,
    width: '80%',
    height: '80%'
  },
  pictureImage:{
    width: 200,
    height:200,
    borderRadius: 100
  },
  btnContainer:{
    gap: 8,
    width: 'auto',
    marginTop:30,
    gap:30
  },
  button:{
    backgroundColor: colors.callToActionA,
    padding: 10,
    borderRadius: 5,
  },
  btnText:{
    fontFamily: 'Poppins-SemiBold',
    fontSize:16,
    textAlign:'center',
    padding:8,
    color: colors.dark
  }, 
  btnOtherPic:{
    backgroundColor:colors.primary,
  },
  btnOtherPicTxt:{
    color:'white'
  },
  noImageContainer:{
    backgroundColor:colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:15,
    width: '80%',
    height: '80%'
  },
  regularText:{
    fontFamily: 'Poppins-SemiBold',
    fontSize:18,
    textAlign: 'center',
    padding:25
  },
  clearText:{
    color: colors.clear
  }
 
})