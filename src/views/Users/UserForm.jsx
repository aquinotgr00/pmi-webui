import React, { Component } from 'react'
import { Form, FormGroup, Input, Button } from 'reactstrap'
import { Main, CollapsePrivilages } from 'components'
import { detailsUserApi } from 'services/api'
import ucwords from 'utils/string'

import 'react-datepicker/dist/react-datepicker.css'

export default class UserForm extends Component {
  constructor (props) {
    super(props)
    this.loadUser           = this.loadUser.bind(this)
    this.onChangeName       = this.onChangeName.bind(this)
    this.onChangeEmail      =  this.onChangeEmail.bind(this)
    this.onChangePosition   = this.onChangePosition.bind(this)
    this.handleSubmit       = this.handleSubmit.bind(this)

    this.state = {
      items: [],
      roles: [],
      privilages: [],
      userData: [],
      name:'',
      email:'',
      role_id:''
    }
  }

  componentDidMount () {
    const { user, userId } = this.props.match.params
    if (userId) {
      this.loadUser(userId)
    }
    this.loadRoles()
    this.loadPrivilages()
  }

  async loadUser (userId) {
    const response = await detailsUserApi(userId)
    const { status } = response.data
    if(status === 'success'){
      const { data } = response.data
      const { user: userData } = data
      this.setState({ name: userData.name, email: userData.email})
    }

  }

  loadRoles(){
    const roles = [
    {
      id:1,
      text: 'Super Admin'
    },
    {
      id:2,
      text: 'Admin Donasi'
    },
    {
      id:3,
      text: 'Admin Relawan'
    }
    ]
    this.setState({ roles: roles })
  }

  loadPrivilages(){
    const privilages = [
    {
      id:1,
      name: 'Administrator',
      isOpen: false,
      list: [
      {
        id:1,
        text: 'Lihat Halaman Administrator'
      },
      {
        id:2,
        text: 'Buat Administrator'
      },
      ]
    },
    ]
    this.setState({privilages: privilages})
  }

  onChangeName(event) {
    this.setState({name: event.target.value});
  }

  onChangeEmail(event) {
    this.setState({email: event.target.value});
  }

  onChangePosition(event) {
    this.setState({role_id: event.target.value});
  }

  handleSubmit(event) {
    console.log(this.state)
    event.preventDefault();
  }


  render () {
    const { user, userId } = this.props.match.params
    const userCategory = ucwords(user.split('-').join(' '))
    const title = userId ? `Edit ${userCategory}` : `Tambah ${userCategory} Baru`
    
    return (
      <Main title={title}>
      <div className='row pl-3'>
      <Form className='col-md-6 col-lg7 pl-0' onSubmit={this.handleSubmit}>
      <FormGroup>
            <label>Nama Lengkap</label>
            <Input 
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.onChangeName}
              />
          </FormGroup>
          <FormGroup>
            <label>Email</label>
            <Input 
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.onChangeEmail}
              />
          </FormGroup>
          <FormGroup>
            <label>Posisi Admin</label>
            <Input 
            type="text"
            name="role_id"
            value={this.state.role_id}
            onChange={this.onChangePosition}
              />
          </FormGroup>
          <FormGroup>
            <label>Kata Sandi</label>
            <Input 
            type="password"
            name="password" />
          </FormGroup>
          <FormGroup>
            <label>Ulangi Kata Sandi</label>
            <Input 
            type="password"
            name="password_confirmation" />
          </FormGroup>
      <div className="float-right">
      <Button type="submit" color="success">Simpan</Button>
      </div>
      </Form>
      <div className='col-md-4 col-lg-5 pl-5 grs'>
      <div className='mb-4'>
      <label>Pengaturan Hak Istimewa</label>
      <Input type="select">
      <option key="0" value="0">Pilih Hak</option>
      {this.state.roles.map(role => <option key={role.id} value={role.id}>{role.text}</option>)}
      </Input>
      <CollapsePrivilages privilages={this.state.privilages} />
      </div>
      </div>
      </div>
      </Main>
      )
  }
}
