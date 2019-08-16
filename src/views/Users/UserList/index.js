import React, { Component } from 'react'
import { PaginationLink, Tool, VolunteerProfileModal } from 'components'
import { AddNewActionButton } from 'components/ActionButtons'
import { Administrator } from './Administrator'
import { Donator } from './Donator'
import { Volunteer } from './Volunteer'
import { listUserApi, updateActiveUserApi, getDonatorList, getVolunteerList } from 'services/api'

export default class UserList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      page: 1,
      searchFor: '',
      isLoading: false,
      userData: [],
      error: null,
      modal: false
    }

    this.loadUser     = this.loadUser.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.goToPage     = this.goToPage.bind(this)
    this.handleDisableEnable = this.handleDisableEnable.bind(this)
    this.toggleProfileModal = this.toggleProfileModal.bind(this)
  }

  componentDidMount () {
    this.loadUser()
  }

  async loadUser (page = 1, searchFor = '') {
    const userParams = new URLSearchParams()
    const { user } = this.props
    userParams.append('page', page)
    userParams.append('s',searchFor)
    this.setState({ isLoading:true, error: null })
    let response = { data: null}
    switch (user) {
      case 'admin':
      response = await listUserApi(userParams)
      break
      case 'donator':
      response = await getDonatorList(userParams)
      break
      case 'volunteer':
      response = await getVolunteerList(userParams)
      break
    }
    const { status } = response.data
    if(status === 'success'){
      const { data } = response.data
      const { current_page: currentPage, last_page: numberOfPages, data: userData, from, to, total: numberOfEntries } = data.admins
      this.setState({ isLoading: false, userData, currentPage, numberOfPages, from, to, numberOfEntries, searchFor })
    }
  }

  toggleProfileModal () {
      const modal = true
      this.setState({modal})
  }

  handleSearch (event) {
    const searchKeyword = event.target.value
    this.loadUser(this.state.page, searchKeyword)
  }

  goToPage(page){
    this.setState({ page })
    this.loadUser(page, this.state.searchFor)
  }

  async handleDisableEnable(event){
    let params = event.target.value.split(',')
    let oposite = (params[1] == 1)? 'disable' : 'enable'
    let oposite_msg = (params[1] == 1)? 'Non-aktif' : 'Aktif'
    const response = await updateActiveUserApi(params[0],oposite)
    const { status } = response.data
    if (status === 'success') {
      const { data } = response.data
      this.setState({ userData : this.state.userData.map(item => item.id === data.id ? data : item) })
      alert('Berhasil me'+oposite_msg+'kan Admin')
    }
  }

  renderUserList(user){
    const { userData,currentPage, numberOfPages, from, to, numberOfEntries } = this.state
    
    const { pathname } = this.props.location
    return (
      <>
      <PaginationLink
      rowFrom={from}
      rowTo={to}
      numberOfEntries={numberOfEntries}
      currentPage={currentPage}
      numberOfPages={numberOfPages}
      onPageChange={this.goToPage}
      />
      { (user === 'admin') && <Administrator data={userData} path={pathname} toggleEnable={this.handleDisableEnable} /> }
      { (user === 'donator') && <Donator data={userData} path={pathname} /> }
      { (user === 'volunteer') && <Volunteer data={userData} path={pathname} toggleProfileModal={this.toggleProfileModal} isOpen={this.state.modal} /> }
      </>
      )
  }

  render () {
    const { user, title } = this.props
    const { error } = this.state
    return (
      <>
      <Tool onSearch={this.handleSearch}>
      {user === 'admin' &&
      <AddNewActionButton path={`${user}/create`} tooltipText={`Tambah ${title} Baru`} />
      }
      </Tool>
      {error
        ? <div>Error</div>
        : this.renderUserList(user)
      }
      </>
      )
    }
  }
