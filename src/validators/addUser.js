import * as Yup from 'yup'
import localeID from './setLocaleID.js'

Yup.setLocale(localeID)

export default Yup.object().shape({
  name: Yup.string()
    .required(),
  email: Yup.string()
    .email()
    .required(),
  role_id: Yup.string()
    .required(),
  options: Yup.array()      
      .required()
      .min(1),
  password: Yup.string()
    .min(6)
    .required(),
  password_confirmation:  Yup.string()
    .oneOf([Yup.ref('password'), null])
    .required()
})
