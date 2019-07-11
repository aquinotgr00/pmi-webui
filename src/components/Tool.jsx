import React from 'react'
import { Form } from 'reactstrap'
import { Searchbar } from './Searchbar'
export function Tool (props) {
  return (
    <div>
      <Form className='form-inline my-2 mb-3'>
        <Searchbar />
      </Form>
    </div>
  )
}
