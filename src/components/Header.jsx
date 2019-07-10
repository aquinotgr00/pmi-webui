import React from 'react'
import { Col, DropdownItem, DropdownMenu, DropdownToggle, Row, UncontrolledDropdown } from 'reactstrap'

export default function Header(props) {
  return (
    <header id="nav-top" className="pt-4">
      <Row>
        <Col md="10">
          <h1>{props.title}</h1>
        </Col>
        <Col md="2">
          <UncontrolledDropdown>
            <DropdownToggle caret tag="a">
              admin 01
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>
                Pengaturan
              </DropdownItem>
              <DropdownItem>
                Keluar
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Col>
      </Row>
      <hr/>
    </header>
  )
}