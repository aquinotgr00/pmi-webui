import React from 'react'
import { Button } from 'reactstrap'

export function PublishButton(props) {
  return (
    <Button type='button'
      disabled={props.disabled}
      onClick={props.onClick}
      className='ml-4'
      color='success'
    >
      Publish
    </Button>
  )
}
