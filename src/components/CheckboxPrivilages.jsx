import React from 'react'
import { Label, Input } from 'reactstrap'
import { Field, connect } from 'formik'

export const CheckboxPrivilages = connect(function (props) {
	const { index, value, label } = props

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
							onChange={e => props.formik.setFieldValue(`privileges[${value}].privilege_id`, e.target.value)}
						/>
					)} 
					/>
				<Label className="form-check-label style-privilage">{label}</Label>
			</div>
		</li>
	)
})
