import React, { Component } from 'react'
import { Label, Input } from 'reactstrap'
import { Field, connect } from 'formik'

export const CheckboxPrivileges = connect(function (props) {
	const { value, label, privilege_id } = props
	return (
		<li>
			<div className="form-check mb-3">
				<Field
					name={`privileges[${value}].privilege_id`}
					render={({ field }) => (
						<Input {...field}
							type="checkbox"
							className="form-check-input"
							value={value}
							onChange={e => {
								props.formik.setFieldValue(`privileges[${value}].privilege_id`, e.target.value)
								props.handleCheckbox(e)
							}}
                            checked={privilege_id}
						/>
					)} 
					/>
				<Label className="form-check-label style-privilage">{label}</Label>
			</div>
		</li>
	)
})