import React from 'react'
import { EditActionButton } from './EditActionButton'

export function CampaignListActionButtons (props) {
  return (
    <>
      <button className='btn btn-table circle-table tambah-hari-table' />
      <EditActionButton path={props.editPath} />
      <button className='btn btn-table circle-table buka-table' />
    </>
  )
}
