import * as Yup from 'yup'
import localeID from './setLocaleID.js'

Yup.setLocale(localeID)

export default Yup.object().shape({
  title: Yup.string()
    .required(),
  description: Yup.string()
    .required(),
  image_file: Yup.mixed()
    .required()
})
