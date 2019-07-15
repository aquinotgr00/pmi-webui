import React from 'react'
import { Route } from 'react-router-dom'
import { Main } from 'components'
import ucwords from 'utils/string'
import UserList from 'components/UserList'

export default function Users (props) {
  const { user } = props.match.params
  const title = ucwords(user.split('-').join(' '))
  return (
    <Main title={title}>
      {['admin', 'donator', 'volunteer'].map(function (c,index) {
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
