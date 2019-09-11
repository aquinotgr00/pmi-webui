import React, { Component } from 'react'
import { Row, FormGroup, Input, Button, FormFeedback } from 'reactstrap'
import { Main, CollapsePrivilages } from 'components'
import { 
  detailsUserApi, 
  storeUserApi, 
  updateUserApi,
  listRolesApi,
  listCategoryPrivilegesApi
} from 'services/api'
import { Formik, Form, Field } from 'formik'
import { withRouter } from 'react-router-dom'
import AddUserSchema from 'validators/addUser'
import UpdateUserSchema from 'validators/updateUser'
import ucwords from 'utils/string'

class AdminForm extends Component {
  constructor(props) {
    super(props)

    this.loadUser = this.loadUser.bind(this)
    this.handleUpdateUser = this.handleUpdateUser.bind(this)

    this.state = {
      roles: [],
      privileges: [],
      name: '',
      email: '',
      role_id: '',
      password: '',
      password_confirmation: '',
      userId: null,
      checkList: []
    }
    this.checkListItem = this.checkListItem.bind(this)
    this.handleChangeRole = this.handleChangeRole.bind(this)
  }

  componentDidMount() {
    const { userId } = this.props.params
    if (userId) {
      this.loadUser(userId)
    }
    this.loadRoles()
    this.loadPrivilages()
  }

  handleChangeRole(e){
    const role_id = e.target.value
    this.setState({ role_id })
  }

  checkListItem(e){
    
    const { checkList } = this.state
    let data = e.target.value
    if (e.target.checked) {
      if (checkList.indexOf(data) === -1) checkList.push(data)
    }else{
      var index = checkList.indexOf(data);
      if (index !== -1) checkList.splice(index, 1);
    }
    
    this.setState({ checkList })
  }

  async loadUser(userId) {

    const response = await detailsUserApi(userId)
    const { status } = response.data
    if (status === 'success') {
      const { data } = response.data
      const { id: userId, name, email } = data.user
      this.setState({ name, email, userId })
    }
  }

  async loadRoles() {
    const response    = await listRolesApi()
    const { status }  = response.data

    if (status === 'success') {
      const { data: roles } = response.data
      this.setState({ roles })
    }
  }

  async loadPrivilages() {
    const response    = await listCategoryPrivilegesApi()
    const { status }  = response.data

    if (status === 'success') {
      const { data: privileges } = response.data
      this.setState({ privileges })
    }
  }


  async handleStoreUser(values) {
    try {
      const storeResponse = await storeUserApi(values)
      const { status } = storeResponse.data
      if (status === 'success') {
        const { history } = this.props
        history.push(`/admin/users/admin`)
      }
    } catch (e) {}
  }

  async handleUpdateUser(userId, values) {
    try {
      const updateResponse = await updateUserApi(userId, values)
      const { status } = updateResponse.data
      if (status === 'success') {
        const { history } = this.props
        history.push(`/admin/users/admin`)
      }
    } catch (e) {}
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
      checkList: privileges  
    } = this.state

    let initialValues = { 
      name, 
      email, 
      password, 
      password_confirmation,
      role_id,
      privileges  
    }

    return (
      <Main title={title}>
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
              isSubmitting
            }) => (

                <Form onSubmit={handleSubmit} className='col-md-6 col-lg7 pl-0'>

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


                </Form>

              )}

          </Formik>

          <div className='form-group col-md-4 col-lg-5 pl-5 grs'>
            <div className='mb-4'>
              <label>Pengaturan Hak Istimewa</label>
              <Input type="select" onChange={this.handleChangeRole}>
                <option key="0" value="0">Pilih Hak</option>
                {this.state.roles.map(role => <option key={role.id} value={role.id}>{role.name}</option>)}
              </Input>
              <CollapsePrivilages privileges={this.state.privileges} checkListItem={this.checkListItem} />
            </div>
          </div>
        </Row>
      </Main>
    )
  }
}

export default withRouter(AdminForm)
