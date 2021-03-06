import * as Yup from 'yup'
import localeID from './setLocaleID.js'

Yup.setLocale(localeID)

export default Yup.object().shape({
  title: Yup.string()
    .required()
    .label('Judul Kejadian'),
  description: Yup.string()
    .required()
    .label('Deskripsi Singkat'),
  image: Yup.mixed()
    .required()
    .label('Gambar Utama')
})
