import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Sidebar from 'components/Sidebar/Sidebar'
import routes from 'routes.js'

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  
  getRoutes = routes => {
    return routes.map((prop, key) => {
      return (
        <Route
          path={`${this.props.match.path + prop.path}`}
          component={prop.component}
          key={key}
        />
      )
    })
  }
  
  render() {
    return (
      <>
        <div className="container-fluid">
          <div className="row">
            <Sidebar />
            <div className="col-md-9 ml-sm-auto col-lg-10 main">
              <Switch>{this.getRoutes(routes)}</Switch>
            </div>
          </div>
        </div>
        <footer className="mb-3 footer">
          <div className="col-2"></div>
          <div className="col-md-9 ml-sm-auto col-lg-10 pt-4">
            <hr/>
            <p>Powered by Nassau 2019. All right reserved</p> 
          </div>
          
        </footer>
      </>
    );
  }
}

export default Admin
