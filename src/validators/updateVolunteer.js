import * as Yup from 'yup'
import localeID from './setLocaleID.js'

Yup.setLocale(localeID)

export default Yup.object().shape({
  name: Yup.string()
    .required(),
  birthplace: Yup.string()
    .required(),
  dob: Yup.string()
    .required(),
  gender:  Yup.string()
    .required(),
  religion:  Yup.string()
    .required(),
  city:  Yup.string()
    .required(),
  subdistrict:  Yup.string()
    .required(),
  subdivision:  Yup.string()
    .required(),
  unit:  Yup.string()
    .required(),
  type:  Yup.string()
    .required(),
  sub_type:  Yup.string()
    .required(),
})
