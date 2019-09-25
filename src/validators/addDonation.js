import * as Yup from 'yup'
import localeID from './setLocaleID.js'

Yup.setLocale(localeID)

export default Yup.object().shape({
  campaign_id: Yup.string()
    .required()
    .label('Judul'),
  name: Yup.string()
    .required()
    .label('Nama Donatur'),
  email: Yup.string()
    .email()
    .required()
    .label('E-mail'),
  phone: Yup.number()
    .required()
    .label('No. Telepon'),
  fundraising: Yup.number(),
  amount: Yup.number()
    .when('fundraising', {
      is: 1,
      then: Yup.number().min(10000),
      otherwise: Yup.number().nullable(),
    })
    .label('Besar Donasi')
})
