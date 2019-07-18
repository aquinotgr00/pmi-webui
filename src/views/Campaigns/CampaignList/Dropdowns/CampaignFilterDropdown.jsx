import React from 'react'
import { DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown } from 'reactstrap'
import FilterDropdownItem from './FilterDropdownItem'

export function CampaignFilterDropdown (props) {
  return (

    <UncontrolledDropdown className='mr-4'>
      <DropdownToggle
        caret
        className='btn btn-outline-secondary'
        tag='button'
        type='button'
      >
        Filter
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem onClick={() => props.onChange({})}>Reset</DropdownItem>

        <FilterDropdownItem
          trueItem='Terpublikasi'
          falseItem='Draft'
          onSelect={selected => props.onChange({ p: selected })}
          selected={props.filters.p}
        />

        <FilterDropdownItem
          divider
          trueItem='Aktif'
          falseItem='Nonaktif'
          onSelect={selected => props.onChange({ a: selected })}
          selected={props.filters.a}
        />

        <FilterDropdownItem
          divider
          trueItem='Ditampilkan'
          falseItem='Disembunyikan'
          onSelect={selected => props.onChange({ v: selected })}
          selected={props.filters.v}
        />
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}
