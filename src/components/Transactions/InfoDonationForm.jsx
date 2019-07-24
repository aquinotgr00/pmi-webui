import React, { Component } from 'react'
import { Row, FormGroup, Input, Button, FormFeedback, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { Formik, Form, Field } from 'formik'
import infoDonationSchema from 'validators/infoDonation'
import { updateInfoTransaction } from 'services/api'

export class InfoDonationForm extends Component {

	constructor(props) {
		super(props)
		this.state = {
			name: '',
			address: '',
			phone:'',
			email:''
		}

		this.handleSubmitInfo = this.handleSubmitInfo.bind(this)
	}

	async handleSubmitInfo(id,values) {
		try {
      		const response = await updateInfoTransaction(id,values)
      		const { status } = response.data
      		if (status === 'success') {

        		console.log(status)
      		}
    	} catch (e) {
      		console.log(e)
    	}
	}

	render() {
		const { name, address, phone, email } = this.props.data || {}
		let initialValues = { name, address, phone, email }
		
		return (
			<Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
				<ModalHeader>
					<h1 className="modal-title" >Edit Info Donatur</h1>
				</ModalHeader>
				<ModalBody className="container">

					<Formik
						enableReinitialize={true}
						initialValues={initialValues}
						validationSchema={infoDonationSchema}
						onSubmit={(values, { setSubmitting }) => {
							this.handleSubmitInfo(this.props.id,values)
							setSubmitting(false)
						}}
					>
						{({
							errors,
							handleSubmit,
							isSubmitting
						}) => (
								<Form onSubmit={handleSubmit}>

									<FormGroup>
										<label htmlFor="name">Nama</label>
										<Field
											name="name"
											render={({ field }) => (
												<Input
													{...field}
													type="text" id="name"
													invalid={errors.name !== undefined} />
											)} />

										{errors.name !== undefined ? <FormFeedback>{errors.name}</FormFeedback> : ''}
									</FormGroup>

									<FormGroup>
										<label htmlFor="address">Alamat</label>
										<Field
											name="address"
											render={({ field }) => (
												<Input
													{...field}
													type="textarea" id="address"
													invalid={errors.address !== undefined} />
											)} />

										{errors.address !== undefined ? <FormFeedback>{errors.address}</FormFeedback> : ''}
									</FormGroup>

									<FormGroup>
										<label htmlFor="phone">No.Telp</label>
										<Field
											name="phone"
											render={({ field }) => (
												<Input
													{...field}
													type="text" id="phone"
													invalid={errors.phone !== undefined} />
											)} />

										{errors.phone !== undefined ? <FormFeedback>{errors.phone}</FormFeedback> : ''}
									</FormGroup>

									<FormGroup>
										<label htmlFor="email">Email</label>
										<Field
											name="email"
											render={({ field }) => (
												<Input
													{...field}
													type="email" id="email"
													invalid={errors.email !== undefined} />
											)} />

										{errors.email !== undefined ? <FormFeedback>{errors.email}</FormFeedback> : ''}
									</FormGroup>

									<div className='float-right'>
										<Button type='submit' color='success' disabled={isSubmitting}>Simpan</Button>
									</div>
								</Form>
							)}

					</Formik>

				</ModalBody>
			</Modal>
		)
	}
}