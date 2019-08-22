import React from 'react'
import { PaginationLink, AddNewActionButton, Tool, EditActionButton } from 'components'
import { DeleteActionButton } from 'components/ActionButtons/DeleteActionButton'
import { Row, Col, Table } from 'reactstrap'

export function CityList(props) {
	const { path, title, history } = props
	return (
		<>
			<Row>
				<Col >
					<Tool onSearch={props.handleSearch}>
						<AddNewActionButton path={`${path}/create`} tooltipText={`Tambah ${title} Baru`} />
					</Tool>
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
						<th>Kabupaten</th>
						<th>Provinsi</th>
						<th>Aksi</th>
					</tr>
				</thead>
				<tbody>
					{props.data && props.data.map((city, key) => (
						<tr key={key}>
							<td>{key + 1}</td>
							<td>{city.name}</td>
							<td>{city.province.name}</td>
							<td>
								<EditActionButton
									path={path + '/' + city.id + '/edit'}
									 />
								<DeleteActionButton									
									dataId={city.id}
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