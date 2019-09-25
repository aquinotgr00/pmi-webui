import * as Yup from 'yup'
import localeID from './setLocaleID.js'

Yup.setLocale(localeID)

export default Yup.object().shape({
  name: Yup.string()
    .required()
    .label('Nama'),
  email: Yup.string()
    .email()
    .label('E-mail'),
  phone: Yup.number()
    .required()
    .label('No. Telepon')
})
