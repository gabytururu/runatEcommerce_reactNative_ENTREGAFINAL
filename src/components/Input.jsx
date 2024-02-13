import { StyleSheet, Text, View, TextInput } from 'react-native'
import {useState} from 'react'
import { colors } from '../global/colors'

const Input = ({label, isSecureEntry=false, error="", onChange}) => {
    const [input, setInput] = useState()

    const handleChangeText = (text) =>{
        setInput(text)
        onChange(text)
    }
  
    return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={styles.inputField}
        onChangeText={handleChangeText}
        secureTextEntry={isSecureEntry}
        value={input}
      />
      {error && <Text style={styles.inputError}>{error}</Text>}
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
    inputContainer:{
        width: '87%',
        justifyContent: 'center',       padding:7
    },
    inputLabel:{
        color: colors.clear,
        fontFamily: 'Poppins-Regular',
        fontSize:15
    },
    inputField:{
        backgroundColor: colors.secondary,
        borderWidth: 0.5,
        borderRadius: 5,
        borderColor: colors.primary,
        padding: 10,
        fontSize: 20,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    inputError:{
      color: colors.callToActionB
    }
})