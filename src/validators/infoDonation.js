import * as Yup from 'yup'

export default Yup.object().shape({
  name: Yup.string()
    .required('Required'),
  email: Yup.string()
    .email(),
  phone: Yup.number()
    .required('Required')
})