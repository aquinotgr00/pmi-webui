import React from 'react'
import { NavLink } from 'react-router-dom'

import { Nav, Navbar, NavItem, NavLink as SubMenu, UncontrolledCollapse } from 'reactstrap'

export function Sidebar () {
  return (
    <Navbar className='col-md-2 d-none d-md-block sidebar'>
      <div className='sidebar-sticky'>
        <img src={require('assets/images/logo-pmi-01.svg')} className='logo logo-nav' alt='logo-pmi' />
        <hr />
        <Nav className='flex-column'>
          <NavItem>
            <SubMenu href='#'>User Management</SubMenu>
          </NavItem>
        </Nav>
        <Nav className='flex-column'>
          <NavItem>
            <SubMenu href='#' id='toggler' className='side'>Donasi Management</SubMenu>

            <UncontrolledCollapse toggler='#toggler' tag='ul' className='list-unstyled'>
              <NavItem>
                <NavLink to='/admin/campaigns/bulan-dana' activeClassName='active'>Bulan Dana</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to='/admin/campaigns/donasi-dana' activeClassName='active'>Donasi Dana</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to='/admin/campaigns/donasi-barang' activeClassName='active'>Donasi Barang</NavLink>
              </NavItem>
            </UncontrolledCollapse>
          </NavItem>
        </Nav>
        <Nav className='flex-column'>
          <NavItem>
            <SubMenu href='#'>Transaksi Management</SubMenu>
          </NavItem>
        </Nav>
        <Nav className='flex-column'>
          <NavItem>
            <SubMenu href='#'>Manual Transaksi</SubMenu>
          </NavItem>
        </Nav>
      </div>
    </Navbar>
  )
}
