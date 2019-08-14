import * as Yup from 'yup'

export default Yup.object().shape({
    subdistrict_id: Yup.number()
        .positive('Kecamatan harus dipilih')
        .required('Kecamatan harus dipilih'),
    name: Yup.string()
        .required('Nama harus diisi')
})
