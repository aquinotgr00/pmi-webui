import React from 'react'
import { Table } from 'reactstrap'
import { formatCurrency } from 'utils/number'

export function FundraisingTable(props) {
	const { title, image, get_type, payment_method_text } = props.data
	
	return (
		<Table>
			<thead>
				<tr>
					<th>Gambar</th>
					<th>Judul</th>
					<th>Tipe Donasi</th>
					<th>Metode Transfer</th>
					<th>Jumlah</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th>
					<img src={image} alt="poster donasi" />
					</th>
					<td>{title}</td>
					<td>{(get_type)? get_type.name : '' }</td>
					<td>{payment_method_text}</td>
					<td>{formatCurrency(props.amount)}</td>
				</tr>
				<tr>
					<th><h1>Total :</h1></th>
					<td colSpan="3"></td>
					<td>
						<h1>{formatCurrency(props.amount)}</h1>
					</td>
				</tr>
			</tbody>
		</Table>
	)
}
