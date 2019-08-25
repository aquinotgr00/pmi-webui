import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { Main } from 'components'
import ucwords from 'utils/string'
import UserList from './UserList'

export default class Users extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { user } = this.props.match.params
    const title = ucwords(user.split('-').join(' '))
    return (
      <Main title={title}>
        {['admin', 'donator', 'volunteer', 'volunteer-moderation'].map(function (c, index) {
          return (
            <Route
              key={index}
              path={`/admin/users/${c}`}
              render={(props) => <UserList {...props} user={user} title={title} />}
            />
          )
        })}
      </Main>
    )
  }

}