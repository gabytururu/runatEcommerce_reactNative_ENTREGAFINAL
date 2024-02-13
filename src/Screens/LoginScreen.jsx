import { StyleSheet, Text, TouchableOpacity, View, KeyboardAvoidingView,ScrollView } from 'react-native'
import Input from '../components/Input'
import {colors} from '../global/colors'
import { useState, useEffect } from 'react'
import { usePostLoginMutation } from '../services/authService'
import { setUser } from '../features/authSlice'
import { useDispatch } from 'react-redux'
import { insertSession } from '../db'
import { loginSchema } from '../validations/loginSchema'

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [postLogin, result] = usePostLoginMutation()

    const handleSubmitLogin = async() =>{
        setEmailError('')
        setPasswordError('')
        try{
            loginSchema.validateSync({email, password},{abortEarly:false})
            const response = await postLogin({email, password});
            if(response.error){
                console.log('Login Error:',response.error.data.error.message)
            }
           
            if (response.success) {
                console.log('Logged user:', email);
            } else {
                setEmailError('Credenciales Inválidas: intenta nuevamente')        
                setPasswordError('Credenciales Inválidas: intenta nuevamente')                    
                setTimeout(()=>{
                    setEmailError('')        
                    setPasswordError('')   
                },2000)
            }           
        }catch(error){
            error.errors.map(eachError =>{
                const customErrorKeys = Object.keys(eachError)[0]
                const customErrorValues = Object.values(eachError)[0]
                switch(customErrorKeys){
                    case 'empty_email':
                        setEmailError(customErrorValues)
                    case 'invalid_email':
                        setEmailError(customErrorValues)
                    case 'empty_password':
                        setPasswordError(customErrorValues)
                    case 'password_too_short':
                        setPasswordError(customErrorValues)
                    default:
                        break
                }                
            })
        }
    }

    const dispatch = useDispatch()    
    useEffect(()=>{
        if(result.data){
            dispatch(setUser(result.data))
            insertSession({
                localId: result.data.localId,
                email: result.data.email,
                token: result.data.idToken
            })
            .then(result=>console.log('**** Session succesfully Stored in Database ****', result))
            .catch(error=>console.log('**** Error: Session Not Storred in Database ****', error.message))
        }    
    },[result])
    
  return (
    <ScrollView style={styles.contWrapper}>
        <KeyboardAvoidingView style={styles.mainAuthContainer}>
            <View style={styles.userPromptContainer}>
                    <Text style={styles.userPromptText}>¿Ya eres Usuari@?</Text>
                    <Text style={styles.userPromptSubText}>Ingresa a tu cuenta!</Text>
            </View>  
            <View style={styles.inputContainer}>
                <Input                
                    label="Email:"
                    onChange={setEmail} 
                    isSecureEntry={false} 
                    error={emailError}
                />
                </View>
            <View style={styles.inputContainer}>
                <Input
                    label="Password:"
                    onChange={setPassword}  
                    isSecureEntry={true}
                    error={passwordError}
                />
            </View>            
            <TouchableOpacity style={styles.authBtn} onPress={handleSubmitLogin}>
                <Text style={styles.authBtnText}>Ingresar</Text>
            </TouchableOpacity>
            <View>
                <Text style={styles.userPromptSubText}>¿No Tienes Una Cuenta?</Text>
                <TouchableOpacity style={styles.authBtn} onPress={()=>navigation.navigate("Signup")}>
                    <Text style={styles.authLink}>Crear Nueva Cuenta</Text>
                </TouchableOpacity>
            </View> 
        </KeyboardAvoidingView>
    </ScrollView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    contWrapper:{
        flex:1,
        backgroundColor: colors.primary,
    },
    mainAuthContainer:{
        flex:1,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        gap:10
    },
    userPromptContainer:{
        marginTop:45,
        alignItems: 'center'
    },
    userPromptText:{
        color: colors.clear,
        fontFamily: 'Poppins-SemiBold',
        fontSize:25,
    },
    userPromptSubText:{
        color: colors.clear,
        fontFamily: 'Poppins-SemiBold',
        fontSize:19
    },
    altAuthContainer:{
        flexDirection: 'column',
        gap: 10,
        alignItems: 'center',
        marginTop: 40
    },
    authText:{
        color: colors.clear,
        fontFamily: 'Poppins-Regular',
        fontSize:15
    },
    authBtnText:{
        color: colors.dark,
        fontFamily: 'Poppins-Regular',
        fontSize:17
    },
    authLink:{
        color: colors.dark,
        fontFamily: 'Poppins-Regular',
        fontSize:17,   
    },
    authBtn:{
        backgroundColor:colors.callToActionA,
        padding: 12,
        borderRadius: 5,
        margin: 10,
        width: '60%',
        alignItems:'center'
    },
    inputContainer:{
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        position: 'relative',  
    },
})