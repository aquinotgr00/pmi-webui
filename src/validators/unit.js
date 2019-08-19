import * as Yup from 'yup'

export default Yup.object().shape({
	name: Yup.string()
		.required('Jenis Anggota harus diisi'),
	city_id: Yup.string()
		.required('Kabupaten/Kota harus dipilih'),
	membership_id: Yup.string()
		.required('Jenis Anggota harus dipilih')
})