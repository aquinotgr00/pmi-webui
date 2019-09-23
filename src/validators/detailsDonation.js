import * as Yup from 'yup'
import localeID from './setLocaleID.js'

Yup.setLocale(localeID)

export default Yup.object().shape({
  manual_payment: Yup.boolean()
    .required(),
  status: Yup.string()
    .required()
})
