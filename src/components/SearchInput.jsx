import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import {useState} from 'react'
import { EvilIcons,Entypo  } from '@expo/vector-icons'; 
import { colors } from '../global/colors';

const SearchInput = ({onSearchHandlerEvent}) => {
  const [searchInput, setSearchInput] = useState('')
  const [error, setError] = useState('')

  const onSearchValidationHandler = () =>{
    const regex = /[^\w\s]/  
    if (regex.test(searchInput)){
      setError('¡oops! Intenta Nuevamente - Evita usar caracteres especiales')
      setSearchInput('')
    }else{
      setError('')
      onSearchHandlerEvent(searchInput)
    }
  }

  const onDeleteSearchHandler =()=>{
    //por qué requiere 2 clicks/press al cross para resetear los items? no los reseetea con un solo click... por qué?
    onSearchHandlerEvent(searchInput)
    setSearchInput('')
   
  }
  return (
    <>
      <View style={styles.searchContainer}>
        <TextInput 
          style={styles.textInput}
          onChangeText={setSearchInput}
          value={searchInput}
          placeholder={'Qué estás buscando?...'}      
        />
        <TouchableOpacity onPress={()=>{onSearchValidationHandler(searchInput)}}>
          <EvilIcons name="search" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDeleteSearchHandler}>
          <Entypo name="cross" size={24} color="black" />
        </TouchableOpacity>     
      </View>
      {error?
        <View style={styles.errorMsgContainer}>
          <Text style={styles.errorMsgText}>{error}</Text>
        </View>
        :
        null
      }
    </>
  )
}

export default SearchInput

const styles = StyleSheet.create({
  searchContainer:{
    flexDirection:'row',
    justifyContent: 'space-between',
    padding:10,
    backgroundColor: colors.mintSoft,

  },
  textInput:{
    width: '80%'
  },
  errorMsgContainer:{
    backgroundColor: colors.callToActionB,
    margin: 10,
    padding: 8,
    borderRadius: 7

  },
  errorMsgText:{
    color: colors.clear,
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold'
  }
})