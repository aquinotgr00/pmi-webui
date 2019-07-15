import React from 'react'
import { Main, InformationCard } from 'components'
import { Row, Col, Table } from 'reactstrap'

export default function DetailsTransaction(props) {
	const { transactionId } = props.match.params
	const title = transactionId
	let details = [
		{
			title: 'Info Donatur',
			items: [
				{
					label: 'Nama',
					text: ''
				},
				{
					label: 'Alamat',
					text: ''
				},
				{
					label: 'Kode Pos',
					text: ''
				},
				{
					label: 'No Tlp',
					text: ''
				},
				{
					label: 'Email',
					text: ''
				},
			]
		},
		{
			title: 'Detail Donasi',
			items: [
				{
					label: 'Tipe Donasi',
					text: ''
				},
				{
					label: 'Metode Transfer',
					text: ''
				},
				{
					label: 'Status Donasi',
					text: ''
				},
				{
					label: 'Catatan',
					text: ''
				}
			]
		}
	]

	return (
		<Main title={title}>
			<Row className="mt-4 mb-5">
				{details.map((detail, index) => {
					return (
						<Col md="4" key={index}>
							<InformationCard title={detail.title} items={detail.items} />
						</Col>
					)
				})}
			</Row>
			<Row>
				<Col>
					<Table>
						<thead>
							<tr>
								<th>Gambar</th>
								<th>Judul</th>
								<th>Tipe Donasi</th>
								<th>Metode Transfer</th>
								<th>Subtotal</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<th><h1>Total :</h1></th>
								<td></td>
								<td></td>
								<td></td>
								<td><h1>Rp 100.000</h1></td>
							</tr>
						</tbody>
					</Table>
				</Col>
			</Row>
		</Main>
	)
}
