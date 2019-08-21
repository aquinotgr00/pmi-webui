import * as Yup from 'yup'

export default Yup.object().shape({
  province_id: Yup.number()
    .required('Provinsi harus dipilih'),
  name: Yup.string()
    .required('nama harus diisi')
})
