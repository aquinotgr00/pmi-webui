import * as Yup from 'yup'

export default Yup.object().shape({
  campaign_id: Yup.string()
    .required('Judul harus dipilih'),
  name: Yup.string()
    .required('Nama harus diisi'),
  email: Yup.string()
    .email()
    .required('E-mail harus diisi'),
  phone: Yup.number()
    .required('No. Telephone harus diisi'),
  fundraising: Yup.number(),
  amount: Yup.number()
    .when('fundraising', {
      is: 1,
      then: Yup.number().min(10000),
      otherwise: Yup.number().nullable(),
    })
})
