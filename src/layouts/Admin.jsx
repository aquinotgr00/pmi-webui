import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { Row } from 'reactstrap'
import { ConfirmLogoutModal, Footer, Sidebar } from 'components'
import routes from 'routes.js'
import { logout, toggleConfirmLogout } from 'actions'

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
    this.toggleConfirmLogoutModal = this.toggleConfirmLogoutModal.bind(this)
    this.logout = this.logout.bind(this)
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

  toggleConfirmLogoutModal() {
    this.props.dispatch(toggleConfirmLogout())
  }

  logout() {
    this.props.dispatch(logout())
  }
  
  render() {
    return (
      <>
        <div className="container-fluid">
          <Row>
            <Sidebar />
            <div className="col-md-9 ml-sm-auto col-lg-10 main">
              <Switch>{this.getRoutes(routes)}</Switch>
            </div>
          </Row>
        </div>
        
        <Footer />

        <ConfirmLogoutModal 
          isOpen={this.props.user.showConfirmLogout}
          toggle={this.toggleConfirmLogoutModal}
          onLogout={this.logout} 
        />
      </>
    );
  }
}

const mapStateToProps = state => ({
  user:state.user
})

export default connect(mapStateToProps)(Admin)
