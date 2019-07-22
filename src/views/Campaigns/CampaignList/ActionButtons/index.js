import React from 'react'
import { DurationActionButton } from './DurationActionButton.jsx'
import { OpenActionButton } from './OpenActionButton'
import { CloseActionButton } from './CloseActionButton'
import { VisibleActionButton } from './VisibleActionButton'
import { HiddenActionButton } from './HiddenActionButton'
import { EditActionButton } from 'components/ActionButtons/EditActionButton'
import { ToggleActionButtons } from './ToggleActionButtons'

export default function CampaignListActionButtons (props) {
  return (
    <>
      <DurationActionButton />
      <EditActionButton path={props.editPath} />
      {props.isClosed ? <CloseActionButton /> : <OpenActionButton />}
      {props.isHidden ? <HiddenActionButton /> : <VisibleActionButton />}
      <ToggleActionButtons
        condition={props.isClosed}
        classTrue='tutup-table'
        classFalse='buka-table'
        onClick={props.toggleAttribute}
        campaignId={props.campaignId}
        attribute='open-close'
      />

      <ToggleActionButtons
        condition={props.isHidden}
        classTrue='hidden-table'
        classFalse='visible-table'
        onClick={props.toggleAttribute}
        campaignId={props.campaignId}
        attribute='visibility'
      />
    </>
  )
}
