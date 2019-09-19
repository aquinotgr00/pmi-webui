import React, { Component } from 'react'
import { Row, FormGroup, Input, Button, FormFeedback } from 'reactstrap'
import { Main, CollapsablePrivilages } from 'components'
import {
  detailsUserApi,
  storeUserApi,
  updateUserApi,
  listRolesApi,
  listPrivilegesApi,
  detailsRolesApi,
  listadminPrivilegesApi
} from 'services/api'
import { Formik, Form, Field, FieldArray } from 'formik'
import { withRouter } from 'react-router-dom'
import AddUserSchema from 'validators/addUser'
import UpdateUserSchema from 'validators/updateUser'
import ucwords from 'utils/string'

class AdminForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      roles: [],
      name: '',
      email: '',
      role_id: 0,
      password: '',
      password_confirmation: '',
      userId: null,
      privileges: [],
      isLoading: false,
      privileges: [],
      options: [],
      adminPrivileges: []
    }

    this.handleUpdateUser = this.handleUpdateUser.bind(this)
    this.handleStoreUser  = this.handleStoreUser.bind(this) 
    this.loadUser         = this.loadUser.bind(this)
    this.loadRoles        = this.loadRoles.bind(this)
    this.handleChangeRole = this.handleChangeRole.bind(this)
    this.loadPrivilages = this.loadPrivilages.bind(this)
		this.loadAdminPrivilages = this.loadAdminPrivilages.bind(this)
		this.handleCheckbox = this.handleCheckbox.bind(this)
		this.handleCreateOptions = this.handleCreateOptions.bind(this)
		this.groupBy = this.groupBy.bind(this)
  }

  componentDidMount() {
    const { userId } = this.props.params
    if (userId) {
      this.loadUser(userId)
    }
    this.loadRoles()
    this.loadPrivilages()
    this.loadAdminPrivilages()
  }

  handleCheckbox(e) {
		const id = e.target.value
    const { privileges } = this.state
    
		privileges.find(privilege => privilege.id == id).privilege_id = (e.target.checked) ? id : false
    
    let options = this.handleCreateOptions(privileges)
		this.setState({ options })
	}

	handleCreateOptions(privileges) {
		let keys = [...new Set(privileges.map(item => item.privilege_category))]
		const groupped = this.groupBy(privileges, item => item.privilege_category)
		let options = []

		keys.map((value, index) => {
			options[value] = groupped.get(value)
		})

		options = Object.values(options)

		return options
	}

	groupBy(list, keyGetter) {
		const map = new Map();
		list.forEach((item) => {
			const key = keyGetter(item);
			const collection = map.get(key);
			if (!collection) {
				map.set(key, [item]);
			} else {
				collection.push(item);
			}
		});
		return map;
	}

	async loadPrivilages(roleId = null) {

		const privilegeParams = new URLSearchParams()

		privilegeParams.append('r_id', roleId)

		const response = await listPrivilegesApi(privilegeParams)
		const { status } = response.data

		if (status === 'success') {
			const { data: privileges } = response.data
			const options = this.handleCreateOptions(privileges)
			this.setState({ options, privileges })
		}
	}

	async loadAdminPrivilages(adminId = null) {

		const privilegeParams = new URLSearchParams()

		privilegeParams.append('a_id', adminId)

		const response = await listadminPrivilegesApi(privilegeParams)
		const { status } = response.data

		if (status === 'success') {
			const { data: privileges } = response.data
			const options = this.handleCreateOptions(privileges)
			this.setState({ options, privileges })
		}
	}

  async handleChangeRole(e) {
    const role_id = e.target.value
    
  }

  async loadUser(userId) {

    const response = await detailsUserApi(userId)
    const { status } = response.data
    if (status === 'success') {
      const { data } = response.data
      const { id: userId, name, email } = data.user
      this.setState({ name, email, userId })
      this.loadAdminPrivilages(userId)
    }
  }

  async loadRoles() {
    const response = await listRolesApi()
    const { status } = response.data

    if (status === 'success') {
      const { data: roles } = response.data
      this.setState({ roles })
    }
  }

  async handleStoreUser(values) {
    this.setState({ isLoading: true })

    try {
      const storeResponse = await storeUserApi(values)
      const { status } = storeResponse.data
      if (status === 'success') {
        this.setState({ isLoading: false })

        const { history } = this.props
        history.push(`/admin/users/admin`)
      }
    } catch (e) {
      this.setState({ isLoading: false })
    }
  }

  async handleUpdateUser(userId, values) {
    try {
      this.setState({ isLoading: true })

      const updateResponse = await updateUserApi(userId, values)
      const { status } = updateResponse.data
      if (status === 'success') {
        this.setState({ isLoading: false })
        const { history } = this.props
        history.push(`/admin/users/admin`)
      }
    } catch (e) {
      this.setState({ isLoading: false })
    }
  }

  render() {
    const { user, userId } = this.props.params
    const userCategory = ucwords(user.split('-').join(' '))
    const title = userId ? `Edit ${userCategory}` : `Tambah ${userCategory} Baru`

    const {
      name,
      email,
      password,
      password_confirmation,
      role_id,
      options,
      roles,
      privileges,
      number,
      isLoading
    } = this.state

    let initialValues = {
      name,
      email,
      password,
      password_confirmation,
      role_id,
      roles,
      options,
      privileges,
      number
    }

    return (
      <Main title={title} isLoading={isLoading}>
        <Row className="pl-3">

          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={this.state.userId > 0 ? UpdateUserSchema : AddUserSchema}
            onSubmit={(values, { setSubmitting }) => {
              if (this.state.userId > 0) {
                this.handleUpdateUser(this.state.userId, values)
              } else {
                this.handleStoreUser(values)
              }
              setSubmitting(false)
            }}
          >
            {({
              errors,
              handleSubmit,
              isSubmitting,
              setFieldValue
            }) => {

              return (

                <Form onSubmit={handleSubmit} className='col-12'>
                  <div className='float-left col-md-6 col-lg-7 pl-0'>
                    <FormGroup>
                      <label>Nama Lengkap</label>
                      <Field
                        name="name"
                        render={({ field }) => (
                          <Input {...field}
                            type="text"
                            invalid={errors.name !== undefined}
                          />
                        )} />

                      {errors.name !== undefined ? <FormFeedback>{errors.name}</FormFeedback> : ''}
                    </FormGroup>

                    <FormGroup>
                      <label>Email</label>
                      <Field
                        name="email"
                        render={({ field }) => (
                          <Input {...field}
                            type="email"
                            invalid={errors.email !== undefined}
                          />
                        )} />

                      {errors.email !== undefined ? <FormFeedback>{errors.email}</FormFeedback> : ''}
                    </FormGroup>

                    <FormGroup>
                      <label>Kata Sandi</label>
                      <Field
                        name="password"
                        render={({ field }) => (
                          <Input {...field}
                            type="password"
                            invalid={errors.password !== undefined}
                          />
                        )} />

                      {errors.password !== undefined ? <FormFeedback>{errors.password}</FormFeedback> : ''}
                    </FormGroup>

                    <FormGroup>
                      <label>Ulangi Kata Sandi</label>
                      <Field
                        name="password_confirmation"
                        render={({ field }) => (
                          <Input {...field}
                            type="password"
                            invalid={errors.password_confirmation !== undefined}
                          />
                        )} />

                      {errors.password_confirmation !== undefined ? <FormFeedback>{errors.password_confirmation}</FormFeedback> : ''}
                    </FormGroup>
                    <div className='float-right'>
                      <Button type='submit' color='success' disabled={isSubmitting}>Simpan</Button>
                    </div>
                  </div>
                  <div className="float-left col-md-4 col-lg-4 pl-5 grs">
                    <div className='mb-4'>
                      <label>Pengaturan Hak Istimewa</label>
                      <Field
                        name="role_id"
                        render={({ field }) => (
                          <Input {...field}
                            type="select"
                            onChange={(e) => {
                              this.handleChangeRole(e)
                              setFieldValue('role_id', e.target.value)
                            }}
                            invalid={errors.role_id !== undefined} >
                            <option value="0">Pilih salah satu</option>
                            {roles.map((role, key) => <option key={key} value={role.id}>{role.name}</option>)}

                          </Input>
                        )} />
                      {errors.role_id !== undefined ? <FormFeedback>{errors.role_id}</FormFeedback> : ''}
                    </div>
                    {errors.privileges !== undefined ? <b className="text-danger">{errors.privileges}</b> : ''}
                    <FormGroup>
                      <FieldArray
                        name="privileges"
                        render={arrayHelpers => (
                          <>
                            <CollapsablePrivilages options={options} handleCheckbox={this.handleCheckbox} />
                          </>
                        )} />

                    </FormGroup>
                  </div>
                </Form>

              )
            }
            }

          </Formik>


        </Row>
      </Main>
    )
  }
}

export default withRouter(AdminForm)
