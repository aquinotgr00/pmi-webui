import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import PrivateRoute from 'components/PrivateRoute'
import LoginRoute from 'components/LoginRoute'
import AdminLayout from 'layouts/Admin'
import Login from 'views/Login'
import ForgotPassword from 'views/ForgotPassword'
import ResetPassword from 'views/ResetPassword'
import NoMatch from 'views/FourOFour'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'assets/css/style.css'

function App () {
  return (
    <Router>
      <Switch>
        <PrivateRoute path='/admin' component={AdminLayout} />
        <LoginRoute path='/login' component={Login} />
        <Route path='/forgot-password' component={ForgotPassword} />
        <Route path='/reset-password/:token' component={ResetPassword} />
        <Redirect exact from='/' to='/admin' />
        <Route component={NoMatch} />
      </Switch>
    </Router>
  )
}

export default App
