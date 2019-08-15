import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'react-router-dom'
import { Button } from 'reactstrap'
import { ConfirmModal } from 'components'

import {
	deleteCityApi,
	deleteSubdistrictApi,
	deleteVillageApi
} from 'services/api'

export class DeleteActionButton extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isOpen: false
		}
		this.onAction = this.onAction.bind(this)
		this.toggle = this.toggle.bind(this)
	}

	async onAction() {
		const { title, dataId } = this.props
		let response = null
		switch (title) {
			case 'kabupaten-kota':
				response = await deleteCityApi(dataId)
				break
			case 'kecamatan':
				response = await deleteSubdistrictApi(dataId)
				break
			case 'kelurahan-desa':
				response = await deleteVillageApi(dataId)
				break
			default:
				response = null
				break
		}
		if (response !== null) {
			const { status } = response.data
			if (status === 'success') {
				this.toggle()
				const { history } = this.props
				history.push(`/admin/settings/${title}`)
			}
		}
	}

	toggle() {
		this.setState(prevState => ({
			isOpen: !prevState.isOpen
		}))
	}
	render() {
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
