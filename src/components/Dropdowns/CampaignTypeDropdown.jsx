import React from 'react'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

export function CampaignTypeDropdown (props) {
  return (

    <UncontrolledDropdown className='mr-4'>
      <DropdownToggle
        caret
        className='btn btn-outline-secondary'
        tag='button'
        type='button'
      >
        {props.campaignType === null && 'Filter Tipe Donasi'}
        {props.campaignType === 1 && 'Umum'}
        {props.campaignType === 2 && 'Khusus'}

      </DropdownToggle>
      <DropdownMenu>
        {props.campaignType !== null &&  <DropdownItem onClick={() => props.onChange(null)}>Semua</DropdownItem> }
        <DropdownItem onClick={() => props.onChange(1)} active={props.campaignType === 1}>Umum</DropdownItem>
        <DropdownItem onClick={() => props.onChange(2)} active={props.campaignType === 2}>Khusus</DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}
