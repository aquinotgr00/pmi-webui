import * as Yup from 'yup'
import localeID from './setLocaleID.js'

Yup.setLocale(localeID)

export default Yup.object().shape({
  province_id: Yup.number()
    .required(),
  name: Yup.string()
    .required()
})
