import * as Yup from 'yup'

export default Yup.object().shape({
  title: Yup.string()
    .required('Required'),
  description: Yup.string()
    .required('Required')
})
