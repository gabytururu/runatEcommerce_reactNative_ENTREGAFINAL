import { object, ref, string } from 'yup'

export const signupSchema = object().shape({
    email:string()
        .required({'empty_email': 'Por favor indica tu email'})
        .email({'invalid_email':'El formato de email no es válido'}),
    password: string()
        .required({'empty_password': 'Por favor confirma la contraseña'})
        .min(6,{'invalid_password': 'La contraseña debe tener mínimo 6 caracteres'}),
    confirmPassword: string()
        .required({'invalid_confirm_password':'Por favor confirma tu contraseña'})
        .oneOf([ref('password'),null],{'invalid_match_password':'Las contraseñas deben ser iguales'})
})