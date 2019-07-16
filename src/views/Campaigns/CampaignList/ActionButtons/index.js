import React from 'react'
import { DurationActionButton } from './DurationActionButton.jsx'
import { OpenActionButton } from './OpenActionButton'
import { CloseActionButton } from './CloseActionButton'
import { VisibleActionButton } from './VisibleActionButton'
import { HiddenActionButton } from './HiddenActionButton'
import { EditActionButton } from 'components/ActionButtons/EditActionButton'

export default function CampaignListActionButtons (props) {
  return (
    <>
      <DurationActionButton />
      <EditActionButton path={props.editPath} />
      {props.isClosed ? <CloseActionButton /> : <OpenActionButton />}
      {props.isHidden ? <HiddenActionButton /> : <VisibleActionButton />}
    </>
  )
}
