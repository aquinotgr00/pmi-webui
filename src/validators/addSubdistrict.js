import * as Yup from 'yup'

export default Yup.object().shape({
  city_id: Yup.number()
    .positive('Kabupaten/Kota harus dipilih')
    .required('Kabupaten/Kota harus dipilih'),
  name: Yup.string()
    .required('Nama harus diisi')
})
