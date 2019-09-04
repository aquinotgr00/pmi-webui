import React from 'react'
import { Button } from 'reactstrap'

export function ApprovalButtons(props) {
  return (
    <>
      <Button type='button'
        disabled={props.disabled}
        onClick={props.onApprove}
        className='ml-4'
        color='success'
      >
        Setujui
      </Button>
      <Button type='button'
        disabled={props.disabled}
        onClick={props.onReject}
        className='btn-outline-secondary'
        color='none'
      >
        Tolak
      </Button>
    </>
  )
}
