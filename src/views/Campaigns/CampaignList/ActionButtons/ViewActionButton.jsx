import React from 'react'
import { Link } from 'react-router-dom'

export function ViewActionButton (props) {
  return (
    <Link to={props.path}>{props.title}</Link>
  )
}
