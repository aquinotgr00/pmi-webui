import React from 'react'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

export function CampaignStatusDropdown () {
  return (

    <UncontrolledDropdown className='mr-4'>
      <DropdownToggle
        caret
        className='btn btn-outline-secondary'
        tag='button'
        type='button'
      >
        Filter Status
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem>Terpublikasi</DropdownItem>
        <DropdownItem>Draft</DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}
