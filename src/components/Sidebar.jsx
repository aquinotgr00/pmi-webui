import React from 'react'
import { Link } from 'react-router-dom'

import { Nav, Navbar, NavItem, NavLink, UncontrolledCollapse } from 'reactstrap'

export function Sidebar () {
  return (
    <Navbar className='col-md-2 d-none d-md-block sidebar'>
      <div className='sidebar-sticky'>
        <img src={require('assets/images/logo-pmi-01.svg')} className='logo logo-nav' alt='logo-pmi' />
        <hr />
        <Nav className='flex-column'>
          <NavItem>
            <NavLink href='#'>User Management</NavLink>
          </NavItem>
        </Nav>
        <Nav className='flex-column'>
          <NavItem>
            <NavLink href='#' id='toggler' className='side'>Donasi Management</NavLink>

            <UncontrolledCollapse toggler='#toggler' tag='ul' className='list-unstyled'>
              <NavItem>
                <Link to='/admin/campaigns/bulan-dana'>Bulan Dana</Link>
              </NavItem>
              <NavItem>
                <Link to='/admin/campaigns/donasi-dana'>Donasi Dana</Link>
              </NavItem>
              <NavItem>
                <Link to='/admin/campaigns/donasi-barang'>Donasi Barang</Link>
              </NavItem>
            </UncontrolledCollapse>
          </NavItem>
        </Nav>
        <Nav className='flex-column'>
          <NavItem>
            <NavLink href='#'>Transaksi Management</NavLink>
          </NavItem>
        </Nav>
        <Nav className='flex-column'>
          <NavItem>
            <NavLink href='#'>Manual Transaksi</NavLink>
          </NavItem>
        </Nav>
      </div>
    </Navbar>
  )
}
