import React, { Component } from 'react'
import { PaginationLink, Tool } from 'components'
import { AddNewActionButton } from 'components/ActionButtons'
import { Administrator } from './Administrator'
import { Donator } from './Donator'
import { Volunteer } from './Volunteer'

export default class UserList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchFor: ''
    }

    this.loadUser = this.loadUser.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  componentDidMount () {
    console.log(this.props.user)
  }

  loadUser (user) {
    switch (user) {
      case 'admin':

        break
      default:
    }
  }

  handleSearch () {

  }

  render () {
    const { user, title } = this.props
    return (
      <>
        <Tool onSearch={this.handleSearch}>
          <AddNewActionButton path={`${user}/create`} tooltipText={`Tambah ${title} Baru`} />
        </Tool>

        <PaginationLink
          rowFrom={1}
          rowTo={5}
          numberOfEntries={24}
          currentPage={1}
          numberOfPages={5}
        />
        { (user === 'admin') && <Administrator /> }
        { (user === 'donator') && <Donator /> }
        { (user === 'volunteer') && <Volunteer /> }
      </>
    )
  }
}
