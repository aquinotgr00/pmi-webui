import React from 'react'
import { Table } from 'reactstrap'

export function NonFundraisingTable(props) {
	const { pick_method_text, donation_items, data } = props
	const { image_url, title, get_type } = data
	let amount = 0;
	return (
		<>
			<Table>
				<thead>
					<tr>
						<th>Gambar</th>
						<th>Judul</th>
						<th>Tipe Donasi</th>
						<th>Metode Penyerahan</th>
						<th>Jenis Barang</th>
						<th>Nama Barang</th>
						<th>Jumlah</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th>
							<img src={image_url} alt="poster donasi" />
						</th>
						<td>
							<p>{title}</p>
						</td>
						<td>
							<p>{(get_type) ? get_type.name : ''}</p>
						</td>
						<td>Dijemput</td>
						<td>

							{(donation_items) && donation_items.map((item, index) => {
								return (
									<p key={index}> {item.type} </p>
								)
							})}
						</td>
						<td>
							{(donation_items) && donation_items.map((item, index) => {
								return (
									<p key={index}>{item.name} </p>
								)
							})}
						</td>
						<td>

							{(donation_items) && donation_items.map((item, index) => {
								amount += parseInt(item.amount)
								return (
									<p key={index}>{item.amount} </p>
								)
							})}
						</td>
					</tr>
					<tr>
						<th><h1>Total :</h1></th>
						<td colSpan="5"></td>
						<td>
							<h1>{amount}</h1>
						</td>
					</tr>
				</tbody>
			</Table>
		</>
	)
}
