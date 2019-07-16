import React from 'react'
import { Link } from 'react-router-dom'
import { UncontrolledTooltip } from 'reactstrap'

export function AddNewActionButton (props) {
  return (
    <>
      <Link to={props.path} id='add-new-action'>
        <img src={require('assets/images/add.svg')} className='add-svg' alt='' />
      </Link>
      <UncontrolledTooltip placement='top' target='add-new-action'>
        {props.tooltipText}
      </UncontrolledTooltip>
    </>
  )
}
