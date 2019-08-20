import React from 'react'
import { connect } from 'react-redux'
import { Col, DropdownItem, DropdownMenu, DropdownToggle, Row, UncontrolledDropdown } from 'reactstrap'
import { showConfirmLogout } from 'actions'

function Header(props) {
  return (
    <header id='nav-top' className='pt-4'>
      <Row>
        <Col md='10' className="navbar navbar-expand-lg navbar-light pl-0 pt-4">
          {(props.back) && <a href={props.back} className="btn-table btn-back back-head mt-1" title="kembali"></a>}
          <div className="mr-md-auto align-self-stretch">
            <h1>{props.title}</h1>
          </div>
        </Col>
        <Col md='2'>
          <UncontrolledDropdown>
            <DropdownToggle caret tag='a'>
              admin 01
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>
                Pengaturan
              </DropdownItem>
              <DropdownItem tag='a' onClick={() => props.dispatch(showConfirmLogout())}>
                Keluar
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Col>
      </Row>
      <hr />
    </header>
  )
}

export default connect()(Header)
