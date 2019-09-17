import * as Yup from 'yup'

export default Yup.object().shape({
  manual_payment: Yup.boolean()
    .required('Required'),
  status: Yup.string()
    .required('Required')
})
