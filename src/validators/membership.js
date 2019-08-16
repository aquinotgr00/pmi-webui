import * as Yup from 'yup'

export default Yup.object().shape({
  name: Yup.string()
    .required('Jenis Anggota harus diisi'),
  code: Yup.string()
})
