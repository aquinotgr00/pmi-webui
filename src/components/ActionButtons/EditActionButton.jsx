import React from 'react'
import { Link } from 'react-router-dom'

export function EditActionButton(props) {
  return (
    <>
      <Link
        to={props.path}
        className='btn btn-table circle-table edit-table'
        title='Edit'
      />
    </>
  )
}
