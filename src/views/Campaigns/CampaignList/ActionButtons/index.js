import React from 'react'
import { DurationActionButton } from './DurationActionButton.jsx'
import { EditActionButton } from 'components/ActionButtons/EditActionButton'
import { ToggleActionButtons } from './ToggleActionButtons'

export default function CampaignListActionButtons (props) {
  
  return (
    <>
      <DurationActionButton duration={props.duration} campaignId={props.campaignId} />
      <EditActionButton path={props.editPath} />

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
