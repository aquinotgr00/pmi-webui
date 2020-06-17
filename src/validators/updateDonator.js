import * as Yup from 'yup'
import localeID from './setLocaleID.js'

Yup.setLocale(localeID)

export default Yup.object().shape({
	name: Yup.string()
		.required()
		.label('Nama Donatur'),
	email: Yup.string()
		.email()
		.required()
		.label('E-mail'),
	phone: Yup.number()
		.required()
		.label('No. Telepon')
})