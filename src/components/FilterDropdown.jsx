import React from 'react'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

export function FilterDropdown(props) {

	let items = props.items

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
				{items.map((item,index) => <DropdownItem key={index} value={item.id}>{item.text}</DropdownItem>)}
			</DropdownMenu>
		</UncontrolledDropdown>
	)
}
