import React from 'react'
import { Button, FormGroup, FormFeedback, Input } from 'reactstrap'
import { Formik, Form, Field } from "formik"
import MembershipSchema from "validators/membership"

export function SubMemberForm(props) {
	const { member } = props
	return (
		<Formik
			enableReinitialize
			validationSchema={MembershipSchema}
			initialValues={member}
			onSubmit={(values, { setSubmitting }) => {
				props.handleSaveMember(values)
				setSubmitting(false)
			}}
		>
			{({
				errors,
				handleSubmit,
				isSubmitting
			}) => (
					<Form className='col-md-6 col-lg7 pl-0' onSubmit={handleSubmit}>
						<FormGroup>
							<label htmlFor='name'>Jenis Anggota</label>
							<Field
								name='name'
								render={({ field }) => (
									<Input {...field} id='name' maxLength={255} invalid={errors.name !== undefined} />
								)}
							/>
							{errors.name !== undefined ? <FormFeedback>{errors.name}</FormFeedback> : ''}
						</FormGroup>
						<FormGroup>
							<label htmlFor='parent_id'>Induk Jenis Anggota</label>
							<Field
								name='parent_id'
								render={({ field }) => (
									<Input type="select" {...field} id='parent_id' invalid={errors.parent_id !== undefined} >
										<option value="0">Pilih Jenis Anggota</option>
										{Object.values(props.parents).map((parent,key) => {
											return(
												<option key={key} value={parent.id}>{parent.name}</option>
											)
										})}
									</Input>
								)}
							/>
							{errors.parent_id !== undefined ? <FormFeedback>{errors.parent_id}</FormFeedback> : ''}
						</FormGroup>
						<div className='float-right'>
							<Button type='submit' color='success' disabled={isSubmitting}>Simpan</Button>
						</div>
					</Form>
				)}
		</Formik>
	)
}