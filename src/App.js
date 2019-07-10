import React from 'react'
import { BrowserRouter as Router, Link, Redirect, Route, Switch } from 'react-router-dom'
import PrivateRoute from 'components/PrivateRoute'
import AdminLayout from 'layouts/Admin'
import Login from 'views/Login'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'assets/css/style.css'

function AdminResetPassword({match}) {
  return <h2>Admin Reset Password : {match.params.token}</h2>;
}

function NoMatch() {
  return <h2>404</h2>;
}

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/admin" render={props => <AdminLayout {...props} />} />
        <Route path="/login" component={Login} />
        <Route path="/reset-password/:token" component={AdminResetPassword} />
        <Route component={NoMatch} />
      </Switch>
    </Router>
  );
}

export default App;
