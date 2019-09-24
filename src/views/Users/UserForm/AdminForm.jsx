import React, { Component } from 'react'
import { Row, FormGroup, Input, Button, FormFeedback } from 'reactstrap'
import { Main, CollapsablePrivilages } from 'components'
import {
  detailsUserApi,
  storeUserApi,
  updateUserApi,
  listRolesApi,
  listPrivilegesApi,
  listrolePrivilegesApi
} from 'services/api'
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik'
import { withRouter } from 'react-router-dom'
import AddUserSchema from 'validators/addUser'
import UpdateUserSchema from 'validators/updateUser'
import ucwords from 'utils/string'

class AdminForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      roles: [],
      userData: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role_id: 0,
        privileges: []
      },
      userId: null,
      isLoading: false,
      listPrivileges: [],
      checkboxes: [],
      rolePrivileges: []
    }

    this.loadUser = this.loadUser.bind(this)
    this.loadRoles = this.loadRoles.bind(this)
    this.loadPrivilages = this.loadPrivilages.bind(this)
    this.loadRolePrivilages = this.loadRolePrivilages.bind(this)
    this.handleSaveUser = this.handleSaveUser.bind(this)    
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
    this.loadRolePrivilages()
  }

  handleCheckbox(e) {
    const id = e.target.value
    const { listPrivileges } = this.state

    listPrivileges.find(privilege => privilege.id == id).privilege_id = (e.target.checked) ? id : false

    let checkboxes = this.handleCreateOptions(listPrivileges)
    this.setState({ checkboxes })
  }

  handleCreateOptions(listPrivileges) {
    let keys = [...new Set(listPrivileges.map(item => item.privilege_category))]
    const groupped = this.groupBy(listPrivileges, item => item.privilege_category)
    let checkboxes = []

    keys.map((value, index) => {
      checkboxes[value] = groupped.get(value)
    })

    checkboxes = Object.values(checkboxes)

    return checkboxes
  }

  groupBy(list, keyGetter) {
    const map = new Map()
    list.forEach((item) => {
      const key = keyGetter(item)
      const collection = map.get(key)
      if (!collection) {
        map.set(key, [item])
      } else {
        collection.push(item)
      }
    })
    return map
  }

  async loadRolePrivilages() {
    const response = await listrolePrivilegesApi()
    const { status } = response.data
    if (status === 'success') {
      const { data: rolePrivileges } = response.data
      this.setState({ rolePrivileges })
    }
  }

  async loadPrivilages(roleId = null) {

    const privilegeParams = new URLSearchParams()

    privilegeParams.append('r_id', roleId)

    const response = await listPrivilegesApi(privilegeParams)
    const { status } = response.data

    if (status === 'success') {
      const { data: listPrivileges } = response.data
      const checkboxes = this.handleCreateOptions(listPrivileges)
      this.setState({ checkboxes, listPrivileges })
    }
  }

  async loadUser(userId) {

    const response = await detailsUserApi(userId)
    const { status, data } = response.data
    if (status === 'success') {
      const { user: userData } = data
      this.setState({ userData })
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

  async handleSaveUser(values) {
    this.setState({ isLoading: true })

    try {
      const { userId }      = this.props.match.params
      const saveResponse    = userId ? await updateUserApi(userId, values) : await storeUserApi(values)  
      const { status } = saveResponse.data
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
    const { user, userId }  = this.props.params
    const userCategory      = ucwords(user.split('-').join(' '))
    const title             = userId ? `Edit ${userCategory}` : `Tambah ${userCategory} Baru`
    const validationSchema  = userId ? UpdateUserSchema : AddUserSchema
    
    const {
      checkboxes,
      roles,
      listPrivileges,
      isLoading,
      userData,
      rolePrivileges
    } = this.state
    
    return (
      <Main title={title} isLoading={isLoading}>
        <Row className="pl-3">
          <Formik
            enableReinitialize={true}
            initialValues={userData}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              this.handleSaveUser(values)
              setSubmitting(false)
            }}
          >
            {({
              errors,
              handleSubmit,
              isSubmitting,
              setFieldValue,
              values
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
                              setFieldValue('role_id', e.target.value)
                              setFieldValue('privileges',rolePrivileges.filter((privilege) => privilege.role_id === parseInt(e.target.value)))
                            }}
                            invalid={errors.role_id !== undefined} >
                            <option value="0">Pilih salah satu</option>
                            {roles.map((role, key) => <option key={key} value={role.id}>{role.name}</option>)}

                          </Input>
                        )} />
                      {errors.role_id !== undefined ? <FormFeedback>{errors.role_id}</FormFeedback> : ''}
                    </div>
                    {errors.checkboxes !== undefined ? <b className="text-danger">{errors.checkboxes}</b> : ''}
                    <FormGroup>
                      <CollapsablePrivilages checkboxes={checkboxes} handleCheckbox={this.handleCheckbox} values={values.privileges} />
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
