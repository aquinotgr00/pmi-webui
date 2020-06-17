import * as Yup from 'yup'
import localeID from './setLocaleID.js'

Yup.setLocale(localeID)

export default Yup.object().shape({
  city_id: Yup.number()
    .positive()
    .required()
    .label('Kabupaten/Kota'),
  name: Yup.string()
    .required()
    .label('Kecamatan')
})
