import React from 'react'
import { Card, CardTitle, FormGroup } from 'reactstrap'

export function InformationCard(props) {
	return (
		<Card body>
			<CardTitle>{props.title}</CardTitle>
			{props.items.map((item, index) => {
				return (
					<FormGroup key={index}>
						<label>{item.label}</label>
						<p>{item.text}</p>
					</FormGroup>
				)
			})}
		</Card>
	)
}