import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ user, component: Component, ...rest }) => (
  <Route {...rest} render={props => {
    return (
      user.token
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )
  }} />
)

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(PrivateRoute)
