import React, { Component } from 'react'
import { Label, Input } from 'reactstrap'
import { Field, connect } from 'formik'

export const CheckboxPrivileges = connect(function (props) {
	const { item, arrayHelpers, values } = props	
	return (
		<li>
			<div className="form-check mb-3">
				<Input
					type="checkbox"
					className="form-check-input"
					value={item.id}
					onChange={e => {
						if (e.target.checked) arrayHelpers.push({ 'privilege_id': item.id })
						else {
							let index = values.map((el) => el.privilege_id).indexOf(item.id)
							arrayHelpers.remove(index)
						}
					}}
					checked={(values.map((el) => el.privilege_id).indexOf(item.id) >= 0)}
					 />
				<Label className="form-check-label style-privilage">{item.name}</Label>
			</div>
		</li>
	)
})