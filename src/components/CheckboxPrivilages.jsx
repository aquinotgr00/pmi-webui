import React from 'react'
import { Label, Input } from 'reactstrap';

export function CheckboxPrivilages(props) {
	
	return (
		<li>
			<div className="form-check mb-3">
				<Input type="checkbox" className="form-check-input" value={props.value} />
				<Label className="form-check-label style-privilage">{props.label}</Label>
			</div>
		</li>
	)
}