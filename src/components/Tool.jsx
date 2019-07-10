import React from 'react'
import { Form, Input, InputGroup } from 'reactstrap'

export default function Tool(props) {
  return (
    <tool>
      <Form className="form-inline my-2 mb-3">
        <InputGroup className="srch">
          <Input type="text" className="search-box" placeholder="Cari Sesuatu" />
        </InputGroup>
      </Form>
    </tool>
  )
}