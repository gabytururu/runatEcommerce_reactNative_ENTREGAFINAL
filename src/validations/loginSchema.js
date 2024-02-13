import {object, ref, string} from 'yup'

export const loginSchema = object().shape({
    email:string()
        .required({'empty_email': 'Por favor ingresa tu email registrado'})
        .email({'invalid_email':'El formato de email no es válido'}),
    password: string()
        .required({'empty_password': 'Por favor ingresa un password'})
        .min(6, {'password_too_short': 'La contraseña debe tener mínimo 6 caracteres'})

})