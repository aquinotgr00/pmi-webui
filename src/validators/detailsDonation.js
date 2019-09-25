import * as Yup from 'yup'
import localeID from './setLocaleID.js'

Yup.setLocale(localeID)

export default Yup.object().shape({
  manual_payment: Yup.boolean()
    .required()
    .label('Metode Transfer'),
  status: Yup.string()
    .required()
    .label('Status Donasi')
})
