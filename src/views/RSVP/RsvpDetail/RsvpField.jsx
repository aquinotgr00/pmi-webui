import React from 'react'
import { FormGroup, Label } from 'reactstrap'

export default function RsvpField(props) {
  return (
    <FormGroup className={props.className}>
      <Label>{props.label}</Label>
      <p className={props.valueClassName}>{props.value}</p>
    </FormGroup>
  )
}
