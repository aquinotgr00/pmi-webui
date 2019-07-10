import React from 'react'
import { Link } from 'react-router-dom'

import { Nav, Navbar, NavItem, NavLink } from "reactstrap";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    
  }
  
  render() {
    return (
      <Navbar className="col-md-2 d-none d-md-block sidebar">
        <div className="sidebar-sticky">
          <img src={ require('assets/images/logo-pmi-01.svg') } className="logo logo-nav" alt="logo-pmi" />
          <hr/>
          <Nav className="flex-column">
            <NavItem>
              <NavLink href="#">User Management</NavLink>
            </NavItem>
          </Nav>
          <Nav className="flex-column">
            <NavItem>
              <NavLink href="#">Donasi Management</NavLink>
            </NavItem>
          </Nav>
          <Nav className="flex-column">
            <NavItem>
              <NavLink href="#">Transaksi Management</NavLink>
            </NavItem>
          </Nav>
          <Nav className="flex-column">
            <NavItem>
              <NavLink href="#">Manual Transaksi</NavLink>
            </NavItem>
        </Nav>
        </div>
      </Navbar>
    );
  }
}

export default Sidebar;
