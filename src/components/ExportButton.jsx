import React from 'react'
import { ButtonGroup, Button } from 'reactstrap'
import FormGroup from 'reactstrap/lib/FormGroup';

export function ExportButton(props) {

	let items = props.items

	return (
		<FormGroup className="float-right">
			<div>
				<label>Export Data</label>
			</div>
			<ButtonGroup role="group" aria-label="#">
				{items.map((item, index) => <Button className="btn-line" key={index} >{item.text}</Button>)}
			</ButtonGroup>
		</FormGroup>
	)
}
