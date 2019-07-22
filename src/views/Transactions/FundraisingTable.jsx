import React from 'react'
import { Table } from 'reactstrap'

export function FundraisingTable(props){

	return(
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
											{typeof props.data.campaign !== 'undefined' &&
												<img src={props.data.campaign.image} alt="poster donasi" />
											}
										</th>
										<td>
											{typeof props.data.campaign !== 'undefined' &&
												<p>{props.data.campaign.title}</p>
											}
										</td>
										<td>
											{typeof props.data.campaign !== 'undefined' &&
												<p>{props.data.campaign.get_type.name}</p>
											}

										</td>
										<td></td>
										<td>{props.amount}</td>
									</tr>
									<tr>
										<th><h1>Total :</h1></th>
										<td colSpan="3"></td>

										<td>
											<h1>{props.amount}</h1>
										</td>
									</tr>
								</tbody>
							</Table>
		)
}
