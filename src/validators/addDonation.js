import * as Yup from 'yup'

export default Yup.object().shape({
  campaign_id: Yup.string()
    .required('Judul donasi wajib dipilih'),
  name: Yup.string()
    .required('Nama donatur wajib diisi'),
  email: Yup.string()
    .email()
    .required('E-mail donatur wajib diisi'),
  phone: Yup.number()
    .required('No. Telepon wajib diisi'),
  fundraising: Yup.number(),
  amount: Yup.number()
    .when('fundraising', {
      is: 1, 
      then: Yup.number().min(10000, 'Besar Donasi sebaiknya sama atau lebih dari 10.000'),
      otherwise: Yup.number().min(0),
    })
})
