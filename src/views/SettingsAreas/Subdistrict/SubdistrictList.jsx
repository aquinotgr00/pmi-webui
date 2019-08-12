import React from 'react'
import { PaginationLink, AddNewActionButton, Tool } from 'components'
import { Row, Col, Button, FormGroup, Label, Input, Table } from 'reactstrap'

export function SubdistrictList(props) {
	const { path, title } = props

	return (
		<>
			<Row>
				<Col md="7">
					<Tool onSearch={props.handleSearch}>
						<AddNewActionButton path={`${path}/create`} tooltipText={`Tambah ${title} Baru`} />
					</Tool>
				</Col>
				<Col md="1">
					<Label for="filterCity">Filter:</Label>
				</Col>
				<Col md="3">
					<FormGroup>
						<Input type="select" name="select" id="filterCity" onChange={props.handleFilterCity}>
							<option value="0">Pilih Kabupaten</option>
							{props.filterCity && props.filterCity.map((city, key) => (
								<option key={key} value={city.id}>{city.name}</option>
							))}
						</Input>
					</FormGroup>
				</Col>
				<Col md="1">
					<button onClick={props.handleReset}
						className="circle-table btn-wrapper-reset btn-reset"
						data-toggle="tooltip"
						data-placement="top"
						title=""
						data-original-title="Reset" />
				</Col>
			</Row>
			<PaginationLink
				rowFrom={props.from}
				rowTo={props.to}
				numberOfEntries={props.numberOfEntries}
				currentPage={props.currentPage}
				numberOfPages={props.numberOfPages}
				onPageChange={props.goToPage} />
			<Table hover>
				<thead>
					<tr>
						<th>No</th>
						<th>Kecamatan</th>
						<th>Kabupaten</th>
						<th>Provinsi</th>
						<th>Aksi</th>
					</tr>
				</thead>
				<tbody>
					{props.data && props.data.map((subdistrict, key) => (
						<tr key={key}>
							<td>{key + 1}</td>
							<td>{subdistrict.name}</td>
							<td>{subdistrict.city.name}</td>
							<td>{subdistrict.city.province.name}</td>
							<td>Aksi</td>
						</tr>
					))}
				</tbody>
			</Table>
		</>
	)
}
