import * as Yup from 'yup'

export default Yup.object().shape({
  manual_payment: Yup.boolean()
    .required('Metode Pembayaran wajib dipilih'),
  status: Yup.string()
    .required('Status wajib dipilih')
})
