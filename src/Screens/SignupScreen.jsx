import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native'
import Input from '../components/Input'
import { colors } from '../global/colors'
import { useState, useEffect } from 'react'
import { usePostSignupMutation } from '../services/authService'
import { useDispatch } from 'react-redux'
import { setUser } from '../features/authSlice'
import { signupSchema } from '../validations/signupSchema'

const SignupScreen = ({navigation}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [passwordConfirmError, setPasswordConfirmError] = useState("")
    const [postSignup, result] = usePostSignupMutation()

    const handleSubmitSignup = ()=>{
        setEmailError('')
        setPasswordError('')
        setPasswordConfirmError('')
        try{
            signupSchema.validateSync({email, password, confirmPassword}, {abortEarly:false})
            postSignup({email,password})
        }catch(error){
            error.errors.map(eachError => {
                const customErrorKeys = Object.keys(eachError)[0]
                const customErrorValues = Object.values(eachError)[0]

                switch(customErrorKeys){
                    case 'empty_email':
                        setEmailError(customErrorValues)
                    case 'invalid_email':
                        setEmailError(customErrorValues)
                    case 'empty_password':
                        setPasswordError(customErrorValues)
                    case 'invalid_password':
                        setPasswordError(customErrorValues)
                    case 'invalid_confirm_password':
                        setPasswordConfirmError(customErrorValues)
                    case 'invalid_match_password':
                        setPasswordConfirmError(customErrorValues)
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
        }    
    },[result])

    return (
        <ScrollView  style={styles.contWrapper}>
            <KeyboardAvoidingView style={styles.mainAuthContainer}>
                <View  style={styles.userPromptContainer}>
                    <Text style={styles.userPromptText}>¿Primera vez por acá?</Text>
                    <Text style={styles.userPromptSubText}>¡Crea tu nueva cuenta!</Text>
                </View>           
                <Input
                label="Email:"
                onChange={setEmail}  
                error={emailError}
                />
                <Input
                label="Password:"
                onChange={setPassword}  
                isSecureEntry={true}
                error={passwordError}
                />
                <Input
                label="Repetir Password:"
                onChange={setConfirmPassword}  
                isSecureEntry={true}
                error={passwordConfirmError}
                />
                <TouchableOpacity style={styles.authBtn} onPress={handleSubmitSignup}>
                    <Text style={styles.authBtnText}>Registrarme</Text>
                </TouchableOpacity>
                <View style={styles.altAuthContainer}>
                    <Text style={styles.userPromptSubText}>¿Ya Tienes Una Cuenta?</Text>
                    <TouchableOpacity style={styles.authBtn} onPress={()=>navigation.navigate("Login")}>
                        <Text style={styles.authLink}>Ingresa a tu Cuenta</Text>
                    </TouchableOpacity>
                </View> 
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

export default SignupScreen

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
        marginTop:35,
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
        marginTop: 10
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
        width: '50%',
        alignItems:'center'
    }


})