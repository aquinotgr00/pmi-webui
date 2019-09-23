import * as Yup from 'yup'
import localeID from './setLocaleID.js'

Yup.setLocale(localeID)

export default Yup.object().shape({
  name: Yup.string()
    .required(),
  email: Yup.string()
    .email()
    .required(),
  password: Yup.string()
    .min(6),
  password_confirmation:  Yup.string()
    .oneOf([Yup.ref('password'), null])
})
