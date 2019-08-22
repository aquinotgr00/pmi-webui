import React from 'react'
import { NavLink } from 'react-router-dom'

import { Nav, Navbar, NavItem, NavLink as SubMenu, UncontrolledCollapse } from 'reactstrap'

export function Sidebar() {
  return (
    <Navbar className='col-md-2 d-none d-md-block sidebar'>
      <div className='sidebar-sticky'>
        <img src={require('assets/images/logo-pmi-01.svg')} className='logo logo-nav' alt='logo-pmi' />
        <hr />
        <Nav className='flex-column'>
          <NavItem>
            <SubMenu href='#' id='toggler-user' className='side'>User Management</SubMenu>
            <UncontrolledCollapse toggler='#toggler-user' tag='ul' className='list-unstyled'>
              <NavItem>
                <NavLink to='/admin/users/admin'>Administrator</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to='/admin/users/donator'>Donatur</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to='/admin/users/volunteer'>Relawan</NavLink>
              </NavItem>
            </UncontrolledCollapse>
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
            <SubMenu href='#' id='toggler-transaction' className='side'>Transaksi Management</SubMenu>

            <UncontrolledCollapse toggler='#toggler-transaction' tag='ul' className='list-unstyled'>
              <NavItem>
                <NavLink to='/admin/transactions/bulan-dana'>Bulan Dana</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to='/admin/transactions/donasi-dana'>Donasi Dana</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to='/admin/transactions/donasi-barang'>Donasi Barang</NavLink>
              </NavItem>
            </UncontrolledCollapse>

          </NavItem>
        </Nav>
        <Nav className='flex-column'>
          <NavItem>
            <NavLink to='#' className='nav-link' id='manual-input'>Manual Transaksi</NavLink>
            <UncontrolledCollapse toggler='#manual-input' tag='ul' className='list-unstyled'>
              <NavItem>
                <NavLink exact={true} activeClassName='active' to='/admin/donations/bulan-dana'>Bulan Dana</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to='/admin/donations/donasi-dana'>Donasi Dana</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to='/admin/donations/donasi-barang'>Donasi Barang</NavLink>
              </NavItem>
            </UncontrolledCollapse>
          </NavItem>
        </Nav>
        <hr />
        <Nav className='flex-column'>
          <NavItem>
            <SubMenu href='#' id='toggler-rsvp' className='side'>RSVP</SubMenu>

            <UncontrolledCollapse toggler='#toggler-rsvp' tag='ul' className='list-unstyled'>
              <NavItem>
                <NavLink to='/admin/rsvp/list-rsvp'>List RSVP</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to='/admin/rsvp/moderasi'>Moderasi</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to='/admin/rsvp/arsip'>Arsip</NavLink>
              </NavItem>
            </UncontrolledCollapse>

          </NavItem>
        </Nav>
        <Nav className='flex-column'>
          <NavItem>
            <NavLink to='#' className='nav-link' id='settings'>Settings</NavLink>
            <UncontrolledCollapse toggler='#settings' tag='ul' className='list-unstyled'>
              <NavItem>
                <NavLink to='/admin/membership/sub-jenis-anggota'>
                  Anggota
                  </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to='#' className='nav-link' id='master-wilayah'>Wilayah</NavLink>
                <UncontrolledCollapse toggler='#master-wilayah' tag='ul' className='list-unstyled'>
                  <NavItem>
                    <NavLink exact={true} activeClassName='active' to='/admin/settings/kabupaten-kota'>Kabupaten/Kota</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to='/admin/settings/kecamatan'>Kecamatan</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to='/admin/settings/kelurahan-desa'>Kelurahan/Desa</NavLink>
                  </NavItem>
                </UncontrolledCollapse>
              </NavItem>
              <NavItem>
                <NavLink to='/admin/units' className='nav-link'>Unit</NavLink>
              </NavItem>
            </UncontrolledCollapse>
          </NavItem>
          </Nav>
      </div>
    </Navbar>
      )
    }
