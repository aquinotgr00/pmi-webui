import * as Yup from 'yup'

export default Yup.object().shape({
  payment_method: Yup.string()
    .required('Required'),
  status: Yup.string()
    .required('Required')
})
