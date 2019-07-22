import React from 'react'
import { Card, CardBody, CardTitle, FormGroup } from 'reactstrap'

export function InformationCard(props) {
	return (
		<Card className="card-transaction">
			<CardBody>
				<CardTitle className="row">
					<div className="col-md">
						<label>{props.title}</label>
					</div>
					<div className="col-md mt-1">
						<span data-toggle="modal" role="button" data-target="#EditCustomerInfo">
							<button className="btn btn-edit-frm float-right" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit Info Donatur"></button>
						</span>
					</div>
				</CardTitle>
				<hr className="mt-1 mb-1" />
				{props.items.map((item, index) => {
					return (
						<FormGroup key={index}>
							<label>{item.label}</label>
							<p>{item.text}</p>
						</FormGroup>
					)
				})}
			</CardBody>
		</Card>
	)
}