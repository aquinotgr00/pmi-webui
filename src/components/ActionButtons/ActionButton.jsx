import React from 'react'

export function ActionButton (props) {
  return (
    <button
      className={`btn btn-table circle-table ${props.className}`}
      title={props.title}
    />
  )
}
