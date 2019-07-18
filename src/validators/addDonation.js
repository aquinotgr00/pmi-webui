import * as Yup from 'yup'

export default Yup.object().shape({
  campaign_id: Yup.string()
    .required('Required'),
  name: Yup.string()
    .required('Required'),
  email: Yup.string()
    .email()
    .required('Required'),
  phone: Yup.number()
    .required('Required'),
  amount: Yup.number()
})
