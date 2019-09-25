import * as Yup from 'yup'
import localeID from './setLocaleID.js'

Yup.setLocale(localeID)

export default Yup.object().shape({
	name: Yup.string()
		.required()
		.label('Unit'),
	city_id: Yup.string()
		.required()
		.label('Kabupaten/Kota'),
	membership_id: Yup.string()
		.required()
		.label('Jenis Anggota')
})