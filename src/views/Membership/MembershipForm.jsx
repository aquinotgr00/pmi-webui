import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Button, FormFeedback, FormGroup, Input } from 'reactstrap'
import { Formik, Form, Field } from 'formik'
import { Main } from 'components'
import { storeMembershipApi, detailsMembershipApi, updateMembershipApi } from 'services/api'
import ucwords from 'utils/string'
import MembershipSchema from 'validators/membership'

class MembershipForm extends Component{
    constructor(props) {
        super(props)
        this.state = {
            member: {
                name: '',
                code: ''
            }
        }
        this.loadMember = this.loadMember.bind(this)
        this.handleSaveMember = this.handleSaveMember.bind(this)
    }

    componentDidMount() {
        const { memberId } = this.props.match.params
        if (memberId) {
            this.loadMember(memberId)
        }
    }

    async loadMember(memberId) {
        this.setState({ isLoading: true, error: null })

        try {
            const response = await detailsMembershipApi(memberId)
            const { status } = response.data
            if (status === 'success') {
                const { data: member } = response.data
                this.setState({ member })
            } else {
                // TODO : handle error
                this.setState({ isLoading: false, error: null })
            }
        } catch (error) {
            // TODO : handle error
        }
    }

    async handleSaveMember(member){
        this.setState({ isLoading: true, errorc: null })
        try {
            const { memberId } = this.props.match.params

            const response = memberId ? await updateMembershipApi(memberId, member) : await storeMembershipApi(member)

            const { status } = response.data
            if (status === 'success') {
                this.setState({ isLoading: false, error: null })

                const { history } = this.props

                history.push(`/admin/membership`)
            } else {
                // TODO : handle errors
                this.setState({ isLoading: false, error: null })
            }
        } catch (error) {
            // TODO : handle errors
            this.setState({ isLoading: false, error: null })
        }
    }

    render(){
        const { member } = this.state
        return (
            <Main title="Tambah">
                <div className='row pl-3'>
                    <Formik
                        enableReinitialize
                        validationSchema={MembershipSchema}
                        initialValues={member}
                        onSubmit={(values, { setSubmitting }) => {
                            this.handleSaveMember(values)
                            setSubmitting(false)
                        }}
                    >
                        {({
                            values,
                            errors,
                            setFieldValue,
                            handleSubmit,
                            isSubmitting
                        }) => (
                                <Form className='col-md-6 col-lg7 pl-0' onSubmit={handleSubmit}>
                                    <FormGroup>
                                        <label htmlFor='name'>Kode Jenis Anggota</label>
                                        <Field
                                            name='code'
                                            render={({ field }) => (
                                                <Input {...field} id='code' maxLength={255} invalid={errors.code !== undefined} />
                                            )}
                                        />
                                        {errors.code !== undefined ? <FormFeedback>{errors.code}</FormFeedback> : ''}
                                    </FormGroup>
                                    <FormGroup>
                                        <label htmlFor='name'>Jenis Anggota</label>
                                        <Field
                                            name='name'
                                            render={({ field }) => (
                                                <Input {...field} id='name' maxLength={255} invalid={errors.name !== undefined} />
                                            )}
                                        />
                                        {errors.name !== undefined ? <FormFeedback>{errors.name}</FormFeedback> : ''}
                                    </FormGroup>
                                    <div className='float-right'>
                                        <Button type='submit' color='success' disabled={isSubmitting}>Simpan</Button>
                                    </div>
                                </Form>
                            )}
                    </Formik>
                </div>
            </Main>
        )
    }
}

export default withRouter(MembershipForm)