import * as Yup from 'yup'
import localeID from './setLocaleID.js'

Yup.setLocale(localeID)

export default Yup.object().shape({
  name: Yup.string()
    .required()
    .label('Nama Lengkap'),
  email: Yup.string()
    .email()
    .required()
    .label('E-mail'),
  password: Yup.string()
    .min(6)
    .label('Kata sandi'),
  password_confirmation:  Yup.string()
    .oneOf([Yup.ref('password'), null])
    .label('Konfirmasi kata sandi')
})
