import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const LoginRoute = ({ user, component: Component, ...rest }) => (
  <Route {...rest} render={props => {
    return (
      user.token
        ? <Redirect push to={{ pathname: '/admin', state: { from: props.location } }} />
        : <Component {...props} />
    )
  }} />
)

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(LoginRoute)
