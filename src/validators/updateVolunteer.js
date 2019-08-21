import * as Yup from 'yup'

export default Yup.object().shape({
  name: Yup.string()
    .required('Required'),
  birthplace: Yup.string()
    .required('Required'),
  dob: Yup.string()
    .required('Required'),
  gender:  Yup.string()
    .required('Required'),
  religion:  Yup.string()
    .required('Required'),
  city:  Yup.string()
    .required('Required'),
  subdistrict:  Yup.string()
    .required('Required'),
  subdivision:  Yup.string()
    .required('Required'),
  unit:  Yup.string()
    .required('Required'),
  type:  Yup.string()
    .required('Required'),
  sub_type:  Yup.string()
    .required('Required'),
})
