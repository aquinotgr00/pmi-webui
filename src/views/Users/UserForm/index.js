import React, { Component } from 'react'
import { PaginationLink, Tool } from 'components'
import { AddNewActionButton } from 'components/ActionButtons'
import  AdminForm  from './AdminForm'
import { DonatorForm } from './DonatorForm'
import { VolunteerForm } from './VolunteerForm'
import { listUserApi } from 'services/api'

export default class UserForm extends Component {
  
  	constructor (props) {
		super(props)
	}
  
	render(){
		const { user } = this.props.match.params
  		return (
      	<>
        	{ (user === 'admin') && <AdminForm params={this.props.match.params} /> }
        	{ (user === 'donator') && <DonatorForm /> }
        	{ (user === 'volunteer') && <VolunteerForm /> }
      	</>
  		)
	}
}
