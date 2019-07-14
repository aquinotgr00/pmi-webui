import React from 'react'
import { Link } from 'react-router-dom'
import { UncontrolledTooltip } from 'reactstrap'

export function AddNewActionButton (props) {
  return (
    <>
      <Link to={props.path} id='UncontrolledTooltipExample'>
        <img src={require('assets/images/add.svg')} className='add-svg' alt='' />
      </Link>
      <UncontrolledTooltip placement='top' target='UncontrolledTooltipExample'>
        {props.tooltipText}
      </UncontrolledTooltip>
    </>
  )
}
