import React from 'react'
import CheckboxPrivilages from './CheckboxPrivilages'
import { Collapse } from 'reactstrap'

export function CollapsePrivilagesItem(props) {
	return (
		<li>
			<a href="#" aria-expanded="true" className="side" className="side" onClick={props.toggle} >{props.name}</a>
			<hr />
			<Collapse isOpen={props.isOpen} className="collapse list-privilage">
				<ul className="flex-column privilage-item">
					{props.list.map(values => <CheckboxPrivilages value={values.id} key={values.id} label={values.text} />)}
				</ul>
			</Collapse>
		</li>
	)
}