import React from 'react'
import { connect } from 'react-redux'
import { Badge, Button, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledButtonDropdown, UncontrolledDropdown } from 'reactstrap'
import { withRouter } from 'react-router'
import { showConfirmLogout } from 'actions'

function Header(props) {
  const { history } = props
  return (
    <>
      <header className='navbar navbar-expand-lg navbar-light pl-0 pt-4'>
        {props.back && 
          <Button 
            className='btn-table btn-back back-head mt-1'
            color='link'
            onClick={()=>history.goBack()}
            title='kembali'
          />
        }
        <div className="mr-md-auto align-self-stretch">
          {(props.back) && <a href={props.back} className="btn-table btn-back back-head mt-1" title="kembali"></a>}
          <div className="mr-md-auto align-self-stretch">
            <h1>{props.title}</h1>
          </div>
        </div>
        
        <UncontrolledDropdown className='mr-3'>
          <DropdownToggle className='btn-notif' color='none'>
            <Badge color="secondary"></Badge>
          </DropdownToggle>
          <DropdownMenu right>
            <div></div>
          </DropdownMenu>
        </UncontrolledDropdown>
        <UncontrolledDropdown>
          <DropdownToggle caret tag='a'>
            admin 01
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>
              Pengaturan
            </DropdownItem>
            <DropdownItem tag='a' onClick={() => props.dispatch(showConfirmLogout())}>
              Keluar
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </header>
      <hr />
    </>
  )
}

export default connect()(withRouter(Header))
