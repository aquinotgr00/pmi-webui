import React from 'react';
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
      console.log(props)
      return (
        localStorage.getItem('user')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )}} />
)

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(PrivateRoute)