import * as Yup from 'yup'

export default Yup.object().shape({
  title: Yup.string()
    .required('Judul harus diisi'),
  description: Yup.string()
    .required('Deskripsi harus diisi'),
  image_file: Yup.mixed()
    .required('Harap upload gambar')
})
