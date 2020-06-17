import * as Yup from 'yup'
import localeID from './setLocaleID.js'

Yup.setLocale(localeID)

export default Yup.object().shape({
  name: Yup.string()
    .required()
    .label('Nama'),
  birthplace: Yup.string()
    .required()
    .label('Tempat Lahir'),
  dob: Yup.string()
    .required()
    .label('Tanggal Lahir'),
  gender:  Yup.string()
    .required()
    .label('Jenis Kelamin'),
  religion:  Yup.string()
    .required()
    .label('Agama'),
  city:  Yup.string()
    .required()
    .label('Kabupaten/Kota'),
  subdistrict:  Yup.string()
    .required()
    .label('Kecamatan'),
  subdivision:  Yup.string()
    .required()
    .label('Kelurahan/Desa'),
  unit:  Yup.string()
    .required()
    .label('Unit'),
  type:  Yup.string()
    .required()
    .label('Judul Anggota')
})
