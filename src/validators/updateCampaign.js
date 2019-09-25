import * as Yup from 'yup'
import localeID from './setLocaleID.js'

Yup.setLocale(localeID)

export default Yup.object().shape({
  title: Yup.string()
    .required()
    .label('Judul'),
  description: Yup.string()
    .required()
    .label('Deskripsi'),
  image_file: Yup.mixed()
    .required()
    .label('Gambar Utama')
})
