import React from 'react'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

export function CampaignStatusDropdown (props) {
  return (

    <UncontrolledDropdown className='mr-4'>
      <DropdownToggle
        caret
        className='btn btn-outline-secondary'
        tag='button'
        type='button'
      >
        {props.published === null && 'Filter Status'}
        {props.published === 1 && 'Terpublikasi'}
        {props.published === 0 && 'Draft'}

      </DropdownToggle>
      <DropdownMenu>
        {props.published !== null && <DropdownItem onClick={() => props.onChange(null)}>Semua</DropdownItem> }
        <DropdownItem onClick={() => props.onChange(1)} active={props.published === 1}>Terpublikasi</DropdownItem>
        <DropdownItem onClick={() => props.onChange(0)} active={props.published === 0}>Draft</DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}
