import React, { Component } from 'react'
import { PaginationLink, Tool } from 'components'
import { AddNewActionButton } from 'components/ActionButtons'
import  AdminForm  from './AdminForm'
import { DonatorForm } from './DonatorForm'
import { VolunteerForm } from './VolunteerForm'
import { listUserApi } from 'services/api'

export default function UserForm (props) {
  const { user } = props.match.params
  
  return (
      <>
        { (user === 'admin') && <AdminForm params={props.match.params} /> }
        { (user === 'donator') && <DonatorForm /> }
        { (user === 'volunteer') && <VolunteerForm /> }
      </>
  )
}
