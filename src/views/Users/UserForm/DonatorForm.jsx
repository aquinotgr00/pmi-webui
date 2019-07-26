import React, { Component } from 'react'
import { Row, Col, Button, FormGroup, Label, Table } from 'reactstrap'
import { Main, DonationStatusDropdown } from 'components'
import { getDonator, listDonationByStatus } from 'services/api'
import { formatDate } from 'utils/number'
import DateRangePicker from '@wojtekmaj/react-daterange-picker'

export class DonatorForm extends Component {
	constructor (props) {
		super(props)
		this.state = {
			userId: '',
			name: '',
			address: '',
			postalCode: '',
			phone: '',
			email: '',
			donations: [],
			donationStatus: null,
			rangeDate: [new Date(), new Date()],
		}

		this.loadDonator = this.loadDonator.bind(this)
		this.handleDonationStatusChange = this.handleDonationStatusChange.bind(this)
		this.loadDonationByStatus = this.loadDonationByStatus.bind(this)
		this.handleRangeDateChange = this.handleRangeDateChange.bind(this)
	}

	componentDidMount() {
		const { userId } = this.props.params
		if (userId) {
			this.loadDonator(userId)
			this.setState({userId})
		}
	}

	async loadDonator(userId) {
		const response = await getDonator(userId)
		const { status } = response.data
		if (status === 'success') {
			const { data } = response.data
			const { name, address, postal_code, phone, donations } = data
			const { email } = data.user || {}
			this.setState({ name, address, phone, postalCode: postal_code, email, donations })
		}
	}

	async loadDonationByStatus(donationStatus, startFrom = '', finishTo = '') {
		let response = ''
		if (startFrom && finishTo) {
			response = await listDonationByStatus(this.state.userId, donationStatus, startFrom, finishTo)
		} else {
			response = await listDonationByStatus(this.state.userId, donationStatus)
		}

		const { status } = response.data
		if (status === 'success') {
			const { data } = response.data
			this.setState({donations: data, donationStatus})
		}
	}

	handleDonationStatusChange(donationStatus) {
		this.handleRangeDateChange([new Date(), new Date()], donationStatus)
	}

	handleRangeDateChange(rangeDate, donationStatus = null) {
		if (rangeDate === null)
			rangeDate = [new Date(), new Date()]
		this.setState({rangeDate})

		if (donationStatus === null)
			donationStatus = this.state.donationStatus

		let start   = new Date(rangeDate[0])
		let finish  = new Date(rangeDate[1])

		let startMonthAdd  = parseInt(start.getMonth() + 1)
		let finishMonthAdd = parseInt(finish.getMonth() + 1)

		let startMonth  = (startMonthAdd < 10)? '0'+startMonthAdd : startMonthAdd
		let finishMonth = (finishMonthAdd < 10)? '0'+finishMonthAdd : finishMonthAdd
	
		let startDate   = (start.getDate() < 10)? '0'+start.getDate() : start.getDate()
		let finishDate  = (finish.getDate() < 10)? '0'+finish.getDate() : finish.getDate()

		let startFrom  = this.state.rangeDate[0].getFullYear() + "-" + startMonth + "-" + startDate
		let finishTo = this.state.rangeDate[1].getFullYear() + "-" + finishMonth + "-" + finishDate

		this.loadDonationByStatus(donationStatus, startFrom, finishTo)
	}

	render() {
		const title = 'Nama Donatur'
		return (
			<Main title={this.state.name}>
				<Row>
					<Col lg='4'>
						<Row>
							<div className="col-md">
								<Label>Info Donatur</Label>
							</div>
							<div className="col-md mt-2">
								<span data-toggle="modal" role="button" data-target="#EditCustomerInfo">
									<Button className="btn btn-edit-frm float-right" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit Info Donatur"></Button>
								</span>
							</div>
						</Row>
						<hr className="mt-0" />
						<FormGroup>
							<Label>Nama</Label>
							<p>{this.state.name}</p>
						</FormGroup>
						<FormGroup>
							<Label>Alamat</Label>
							<p>{this.state.address}</p>
						</FormGroup>
						<FormGroup>
							<Label>Kode Post</Label>
							<p>{this.state.postalCode}</p>
						</FormGroup>
						<FormGroup>
							<Label>No Tlp</Label>
							<p>{this.state.phone}</p>
						</FormGroup>
						<FormGroup>
							<Label>E-mail</Label>
							<p>{this.state.email}</p>
						</FormGroup>
					</Col>
					<Col className='col-sm grs'>
						<div>
							<Label>Riwayat Donasi</Label>
						</div>

						<hr className="mt-0" />

						<Row>
							<Col md='6'>
								<div className="form-group">
									<Label for="exampleInputCategoryName">Rentang Waktu</Label>
									<DateRangePicker
										className='form-control'
										calendarIcon={null}
										onChange={this.handleRangeDateChange}
										value={this.state.rangeDate}
									/>
								</div>
							</Col>
							<Col md='6'>
								<DonationStatusDropdown onChange={this.handleDonationStatusChange} donationStatus={this.state.donationStatus} />
							</Col>
						</Row>
							
						<Row>
							<div className="table-responsive ml-4">
								<Table hover>
									<thead>
										<tr>
											<th scope="col">Tanggal Donasi</th>
											<th scope="col">Donasi</th>
											<th scope="col">Tipe Donasi</th>
											<th scope="col">Status</th>
										</tr>
									</thead>
									<tbody>
										{this.state.donations.map(donation => (
											<tr key={donation.id}>
												<th>
													{formatDate(donation.created_at, 'DD-mm-YYYY')}
													<br /><small>
														{formatDate(donation.created_at, 'HH:mm:ss')}
													</small>
												</th>
												<td>{donation.campaign.title}</td>
												<td>-</td>
												<td>{donation.status_text}</td>
											</tr>
										))}
									</tbody>
								</Table>
							</div> 
						</Row>
					</Col>
				</Row>
			</Main>
		)
	}
}