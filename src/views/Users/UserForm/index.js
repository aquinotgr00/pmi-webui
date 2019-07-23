import React, { Component } from 'react'
import  AdminForm  from './AdminForm'
import { VolunteerForm } from './VolunteerForm'

export default class UserForm extends Component {
  
  	constructor (props) {
		super(props)
	}
  
	render(){
		const { user } = this.props.match.params
  		return (
      	<>
        	{ (user === 'admin') && <AdminForm params={this.props.match.params} /> }
        	{ (user === 'volunteer') && <VolunteerForm /> }
      	</>
  		)
	}
}
