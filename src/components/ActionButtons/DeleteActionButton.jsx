import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'react-router-dom'
import { Button } from 'reactstrap'
import { ConfirmModal } from 'components'

export class DeleteActionButton extends Component {
	constructor (props) {
		super(props)
		this.state = {
			isOpen: false
		}
		this.onAction = this.onAction.bind(this)
		this.toggle = this.toggle.bind(this)
	}


	
	onAction(){
		console.log('go to delete '+this.props.path)
	}

	toggle(){
		this.setState(prevState => ({
			isOpen: !prevState.isOpen
		}));
	}
	render(){
		return (
		<>
		<Button
		onClick={this.toggle}
		className='btn btn-table circle-table delete-table'
		title='Hapus'
		/>
		<ConfirmModal
		isOpen={this.state.isOpen}
		toggle={this.toggle}
		onAction={this.onAction}
		labelTitle="Hapus Data"
		labelContent="Anda yakin akan menghapus data ini?"
		labelAction="Hapus"
		/>
		</>
		)
	}
}
