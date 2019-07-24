import React, { Component } from 'react'
import { Row, FormGroup, Input, Button, FormFeedback, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { Formik, Form, Field } from 'formik'
import detailsDonationSchema from 'validators/detailsDonation'
import { updateTransaction } from 'services/api'

export class DetailsDonationForm extends Component {

	constructor(props) {
		super(props)
		this.state = {
			payment_method: '',
			status: '',
			notes:''
		}

		this.handleSubmitDetails = this.handleSubmitDetails.bind(this)
	}

	async handleSubmitDetails(id,values) {
		try {
      		const response = await updateTransaction(id,values)
      		const { status } = response.data
      		if (status === 'success') {
        		console.log(status)
      		}
    	} catch (e) {
      		console.log(e)
    	}
	}

	render() {
		const { payment_method, status, notes } = this.props.data
		let initialValues = { payment_method, status, notes }
		return (
			<Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
				<ModalHeader>
					<h1 className="modal-title" >Edit Info Donatur</h1>
				</ModalHeader>
				<ModalBody className="container">

					<Formik
						enableReinitialize={true}
						initialValues={initialValues}
						validationSchema={detailsDonationSchema}
						onSubmit={(values, { setSubmitting }) => {
							this.handleSubmitDetails(this.props.id,values)
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
										<label htmlFor="payment_method">Metode Transfer</label>
										<Field
											name="payment_method"
											render={({ field }) => (
												<Input
													{...field}
													type="select" id="payment_method"
													invalid={errors.payment_method !== undefined} >
													<option value="">Pilih Metode</option>
													<option value="1">Manual Transfer</option>
													<option value="2">Otomatis Transfer</option>
												</Input>
											)} />

										{errors.payment_method !== undefined ? <FormFeedback>{errors.payment_method}</FormFeedback> : ''}
									</FormGroup>

									<FormGroup>
										<label htmlFor="status">Status Donasi</label>
										<Field
											name="status"
											render={({ field }) => (
												<Input
													{...field}
													type="select" id="status"
													invalid={errors.status !== undefined}
													 >
													<option value="">Pilih Status</option>
													<option value="1">Pending</option>
													<option value="2">Menunggu</option>
													<option value="3">Berhasil</option>
													<option value="4">Dibatalkan</option>
													<option value="5">Selesai</option>
												</Input>
											)} />

										{errors.status !== undefined ? <FormFeedback>{errors.status}</FormFeedback> : ''}
									</FormGroup>

									<FormGroup>
										<label htmlFor="notes">Catatan</label>
										<Field
											name="notes"
											render={({ field }) => (
												<Input
													{...field}
													type="textarea" id="notes"
													invalid={errors.notes !== undefined}
													 />
											)} />

										{errors.notes !== undefined ? <FormFeedback>{errors.notes}</FormFeedback> : ''}
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