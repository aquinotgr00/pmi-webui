import * as Yup from 'yup'

export default Yup.object().shape({
  name: Yup.string()
    .required('Required'),
  email: Yup.string()
    .email()
    .required('Required'),
  role_id: Yup.string()
    .required('Required'),
  privileges: Yup.array()      
      .required('Must have privileges')
      .min(1, 'Minimum of 1 privilege'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  password_confirmation:  Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required')
})
