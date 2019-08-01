import React from 'react'
import { Link } from 'react-router-dom'
import ucwords from 'utils/string'

export function ViewActionButton (props) {
  return (
    <Link to={props.path}>{ucwords(props.title)}</Link>
  )
}
