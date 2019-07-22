import React from 'react'
import { ActionButton } from 'components/ActionButtons'

export function ToggleActionButton (props) {
  return (
    <ActionButton className={props.className} onClick={() => props.onClick(props.campaignId, props.attribute)} />
  )
}
