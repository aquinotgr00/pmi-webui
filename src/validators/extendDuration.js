import * as Yup from 'yup'

export default Yup.object().shape({
    finish_campaign: Yup.date()
        .required('Required')
})
