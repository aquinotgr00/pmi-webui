import React from 'react'
import { Label, Input } from 'reactstrap'
import { Field } from 'formik'

export function CheckboxPrivilages(props) {
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
							onChange={e => props.setFieldValue(`privileges[${value}].privilege_id`, e.target.value)}
							/>
					)} />
				<Label className="form-check-label style-privilage">{label}</Label>
			</div>
		</li>
	)
}