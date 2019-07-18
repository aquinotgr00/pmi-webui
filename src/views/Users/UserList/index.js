import React, { Component } from 'react'
import { PaginationLink, Tool } from 'components'
import { AddNewActionButton } from 'components/ActionButtons'
import { Administrator } from './Administrator'
import { Donator } from './Donator'
import { Volunteer } from './Volunteer'
import { listUserApi } from 'services/api'

export default class UserList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchFor: '',
      isLoading: false,
      data: [],
      error: null
    }

    this.loadUser = this.loadUser.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
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
    let response = null
    switch (user) {
      case 'admin':
      response = await listUserApi(userParams)
      break
      default:
      response = await listUserApi(userParams)
      break
    }
    const { status } = response.data
    if(status === 'success'){
      const { data } = response.data
      const { current_page: currentPage, last_page: numberOfPages, data: userData, from, to, total: numberOfEntries } = data.admins
      this.setState({ isLoading: false, userData, currentPage, numberOfPages, from, to, numberOfEntries, searchFor })
    }
  }

  handleSearch () {

  }

  renderUserList(user){
    const { userData, currentPage, numberOfPages, from, to, numberOfEntries } = this.state
    
    const { pathname } = this.props.location
    return (
      <>
      <PaginationLink
      rowFrom={from}
      rowTo={to}
      numberOfEntries={numberOfEntries}
      currentPage={currentPage}
      numberOfPages={numberOfPages}
      />
      { (user === 'admin') && <Administrator data={userData} path={pathname} /> }
      { (user === 'donator') && <Donator /> }
      { (user === 'volunteer') && <Volunteer /> }
      </>
      )
  }

  render () {
    const { user, title } = this.props
    const { error } = this.state
    return (
      <>
      <Tool onSearch={this.handleSearch}>
      <AddNewActionButton path={`${user}/create`} tooltipText={`Tambah ${title} Baru`} />
      </Tool>
      {error
        ? <div>Error</div>
        : this.renderUserList(user)
      }
      </>
      )
    }
  }
