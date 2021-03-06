import React, { Component } from 'react'
import  AdminForm  from './AdminForm'
import { DonatorForm } from './DonatorForm'
import VolunteerForm from './VolunteerForm'

export default class UserForm extends Component {
  
  	// eslint-disable-next-line no-useless-constructor
  	constructor (props) {
		super(props)
	}
  
	render(){
		const { user } = this.props.match.params
  		return (
      	<>
        	{ (user === 'admin') && <AdminForm params={this.props.match.params} /> }
        	{ (user === 'donator') && <DonatorForm params={this.props.match.params} /> }
        	{ (user === 'volunteer') && <VolunteerForm params={this.props.match.params} /> }
      	</>
  		)
	}
}
