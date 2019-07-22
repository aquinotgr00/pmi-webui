import React from 'react'
import { Table } from 'reactstrap'

export function NonFundraisingTable(props){
	
	return(
		<div>
		{typeof props.data.campaign !== "undefined" &&
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
											<img src={props.data.campaign.image} alt="poster donasi" />
										</th>
										<td>
											<p>{props.data.campaign.title}</p>
										</td>
										<td>
											<p>{props.data.campaign.get_type.name}</p>
										</td>
										<td></td>
										<td></td>
										<td></td>
										<td>{props.amount}</td>
									</tr>
									<tr>
										<th><h1>Total :</h1></th>
										<td colSpan="5"></td>

										<td>
											<h1>{props.amount}</h1>
										</td>
									</tr>
								</tbody>
							</Table>
		}
		</div>
	)
}
