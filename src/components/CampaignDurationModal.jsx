import React from 'react'
import { Button, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, FormFeedback } from 'reactstrap'
import { Formik, Form, Field } from 'formik'
import DatePicker from 'react-datepicker'
import ExtendDurationSchema from 'validators/extendDuration'

export function CampaignDurationModal(props) {
	return (
		<>
			<Modal isOpen={props.durationOpen}>
				<ModalHeader>
					<label>Perpanjang Donasi</label>
				</ModalHeader>
				<ModalBody>
					<Formik
						enableReinitialize
						validationSchema={ExtendDurationSchema}
						initialValues={props.initialCampaign}
						onSubmit={(values, { setSubmitting }) => {
							props.handleSubmitFinishCampaign(values.id, values)
							setSubmitting(false)
						}}
					>
						{({
							values,
							errors,
							setFieldValue,
							handleSubmit,
							isSubmitting
						}) => (

								<>
									<Form className='col-md-6 col-lg7 pl-0' onSubmit={handleSubmit}>
										<FormGroup>
											<Label>Tanggal Selesai</Label>
											<Field
												name='finish_campaign'
												render={({ field }) => (
													<DatePicker
														selected={values.finish_campaign}
														onChange={date => setFieldValue('finish_campaign', date)}
														className='form-control react-datepicker' placeholder='Tanggal Selesai'
														dateFormat="yyyy-MM-dd"
														invalid={errors.finish_campaign !== undefined}
													/>
												)}
											/>
											{errors.finish_campaign !== undefined ? <FormFeedback>{errors.finish_campaign}</FormFeedback> : ''}
										</FormGroup>
										<Button
											id="btn-close-campaign"
											type='button'
											onClick={() => {
												props.handleToggleDuration(values.id)
											}}
										>
											Batal</Button>
										<Button type='button'
											disabled={isSubmitting}
											onClick={handleSubmit}
											className='btn btn-success'
										>
											Simpan</Button>
									</Form>
								</>
							)}
					</Formik>
				</ModalBody>
			</Modal>
		</>
	)
}