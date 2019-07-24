import React from 'react'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

export function DonationStatusDropdown (props) {
  return (
    <UncontrolledDropdown className='float-right mr-0' style={{marginTop:28}}>
      <DropdownToggle
        caret
        className='btn btn-outline-secondary'
        tag='button'
        type='button'
      >
        {props.donationStatus === null && 'Filter Status'}
        {props.donationStatus === 1 && 'Pending'}
        {props.donationStatus === 2 && 'Menunggu'}
        {props.donationStatus === 3 && 'Berhasil'}
        {props.donationStatus === 4 && 'Dibatalkan'}

      </DropdownToggle>
      <DropdownMenu>
        {props.donationStatus !== null && <DropdownItem onClick={() => props.onChange(null)}>Semua</DropdownItem> }
        <DropdownItem onClick={() => props.onChange(1)} active={props.donationStatus === 1}>Pending</DropdownItem>
        <DropdownItem onClick={() => props.onChange(2)} active={props.donationStatus === 2}>Menunggu</DropdownItem>
        <DropdownItem onClick={() => props.onChange(3)} active={props.donationStatus === 3}>Berhasil</DropdownItem>
        <DropdownItem onClick={() => props.onChange(4)} active={props.donationStatus === 4}>Dibatalkan</DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}
