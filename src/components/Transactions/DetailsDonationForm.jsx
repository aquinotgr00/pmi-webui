import React from 'react'
import { FormGroup, Input, Button, FormFeedback, Modal, ModalHeader, ModalBody } from 'reactstrap'
import { Formik, Form, Field } from 'formik'
import detailsDonationSchema from 'validators/detailsDonation'


export function DetailsDonationForm(props) {

	const { payment_method, status, notes } = props.data
	let initialValues = { payment_method, status, notes }

	return (
		<Modal isOpen={props.isOpen} toggle={props.toggle}>
			<ModalHeader>
				<div className="modal-title" >Edit Info Donatur</div>
			</ModalHeader>
			<ModalBody className="container">
				<Formik
					enableReinitialize
					initialValues={initialValues}
					validationSchema={detailsDonationSchema}
					onSubmit={(values, { setSubmitting }) => {
						props.handleSubmitDetails(props.id, values)
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
									<Button type='button' color='secondary' onClick={props.toggle} id="btn-cancel">Batal</Button>
									<Button type='submit' color='success' disabled={isSubmitting}>Simpan</Button>
								</div>
							</Form>
						)}

				</Formik>

			</ModalBody>
		</Modal>
	)
}