import * as Yup from 'yup'

export default Yup.object().shape({
  name: Yup.string()
    .required('Required'),
  email: Yup.string()
    .email()
    .required('Required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters'),
  password_confirmation:  Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
})
