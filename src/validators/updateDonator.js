import * as Yup from 'yup'
import localeID from './setLocaleID.js'

Yup.setLocale(localeID)

export default Yup.object().shape({
	name: Yup.string()
		.required(),
	email: Yup.string()
		.email()
		.required(),
	phone: Yup.number()
		.required()
})