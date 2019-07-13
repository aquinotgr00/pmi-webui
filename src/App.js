import React from 'react'
import { BrowserRouter as Router, Link, Redirect, Route, Switch } from 'react-router-dom'
import PrivateRoute from 'components/PrivateRoute'
import AdminLayout from 'layouts/Admin'
import Login from 'views/Login'
import ResetPassword from 'views/ResetPassword'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'assets/css/style.css'

function NoMatch () {
  return <h2>404</h2>
}

function App () {
  return (
    <Router>
      <Switch>
        <PrivateRoute path='/admin' component={AdminLayout} />
        <Route path='/login' component={Login} />
        <Route path='/reset-password/:token' component={ResetPassword} />
        <Redirect from='/' to='/admin' />
        <Route component={NoMatch} />
      </Switch>
    </Router>
  )
}

export default App
