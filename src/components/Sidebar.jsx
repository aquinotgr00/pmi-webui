import React from 'react'
import { NavLink as RouterNavLink } from 'react-router-dom'

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
                <NavLink href='/admin/campaigns/bulan-dana' active>Bulan Dana</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='/admin/campaigns/donasi-dana'>Donasi Dana</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='/admin/campaigns/donasi-barang'>Donasi Barang</NavLink>
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
            <RouterNavLink to='#' className='nav-link' id='manual-input'>Manual Transaksi</RouterNavLink>
            <UncontrolledCollapse toggler='#manual-input' tag='ul' className='list-unstyled'>
              <NavItem>
                <RouterNavLink exact={true} activeClassName='active' to='/admin/donations/bulan-dana'>Bulan Dana</RouterNavLink>
              </NavItem>
              <NavItem>
                <RouterNavLink to='/admin/donations/donasi-dana'>Donasi Dana</RouterNavLink>
              </NavItem>
              <NavItem>
                <RouterNavLink to='/admin/donations/donasi-barang'>Donasi Barang</RouterNavLink>
              </NavItem>
            </UncontrolledCollapse>
          </NavItem>
        </Nav>
      </div>
    </Navbar>
  )
}
