import * as Yup from 'yup'

export default Yup.object().shape({
  manual_transaction: Yup.boolean()
    .required('Required'),
  status: Yup.string()
    .required('Required')
})
