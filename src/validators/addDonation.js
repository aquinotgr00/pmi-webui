import * as Yup from 'yup'
import localeID from './setLocaleID.js'

Yup.setLocale(localeID)

export default Yup.object().shape({
  campaign_id: Yup.string()
    .required(),
  name: Yup.string()
    .required(),
  email: Yup.string()
    .email()
    .required(),
  phone: Yup.number()
    .required(),
  fundraising: Yup.number(),
  amount: Yup.number()
    .when('fundraising', {
      is: 1,
      then: Yup.number().min(10000),
      otherwise: Yup.number().nullable(),
    })
})
