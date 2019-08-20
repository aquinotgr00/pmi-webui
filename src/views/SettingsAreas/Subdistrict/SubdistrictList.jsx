import React from 'react'
import { PaginationLink, AddNewActionButton, Tool, EditActionButton } from 'components'
import { DeleteActionButton } from 'components/ActionButtons/DeleteActionButton'
import { Row, Col, Button, FormGroup, Label, Input, Table } from 'reactstrap'

export function SubdistrictList(props) {
	const { path, title, history } = props

	return (
		<>
			<div className="head-tools">
				<div className="mr-md-auto align-self-stretch">
					<div className="form-inline my-3">
						<Tool onSearch={props.handleSearch}>
							<AddNewActionButton path={`${path}/create`} tooltipText={`Tambah ${title} Baru`} />
						</Tool>
					</div>
				</div>
				<div className="ml-md-auto align-self-stretch">
					<form className="form-inline my-3">
						<h2 className="my-auto">Filter:</h2>
						<div className="form-group ml-3">
							<Input type="select" name="select" id="filterCity" onChange={props.handleFilterCity}>
								<option value="0">Pilih Kabupaten</option>
								{props.filterCity && props.filterCity.map((city, key) => (
									<option key={key} value={city.id}>{city.name}</option>
								))}
							</Input>
						</div>
						<button onClick={props.handleReset}
							className="btn circle-table btn-reset"
							data-toggle="tooltip"
							data-placement="top"
							title=""
							data-original-title="Reset" />
					</form>
				</div>
			</div>
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
							<td>
								<EditActionButton
									path={path + '/' + subdistrict.id + '/edit'}
								/>
								<DeleteActionButton
									dataId={subdistrict.id}
									title={title}
									history={history}
								/>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</>
	)
}
