import React from 'react'
import { ActionButton } from 'components/ActionButtons'

export function DurationActionButton (props) {
  return (
    <ActionButton className='tambah-hari-table' onClick={() => props.duration(props.campaignId)} />
  )
}
