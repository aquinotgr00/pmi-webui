import React from 'react'
import { Input, InputGroup } from 'reactstrap'

export function Searchbar () {
  return (
    <InputGroup className='srch'>
      <Input type='text' className='search-box' placeholder='Cari Sesuatu' />
    </InputGroup>
  )
}
