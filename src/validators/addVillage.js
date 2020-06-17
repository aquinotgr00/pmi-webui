import * as Yup from 'yup'
import localeID from './setLocaleID.js'

Yup.setLocale(localeID)

export default Yup.object().shape({
    subdistrict_id: Yup.number()
        .positive()
        .required()
        .label('Kecamatan'),
    name: Yup.string()
        .required()
        .label('Kelurahan/Desa')
})
