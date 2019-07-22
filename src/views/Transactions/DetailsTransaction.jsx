import React, { Component } from 'react'
import { Main, InformationCard } from 'components'
import { Row, Col, Table, Card, CardBody, CardTitle, FormGroup } from 'reactstrap'
import { showTransaction } from 'services/api'

export default class DetailsTransaction extends Component {

	constructor(props) {
		super(props)
		this.state = {
			data: []
		}
	}

	componentDidMount() {
		const { transactionId } = this.props.match.params
		this.loadDetailsTransaction(transactionId)
	}

	async loadDetailsTransaction(transactionId) {
		const response = await showTransaction(transactionId)
		const { data, status } = response.data
		if (status === 'success') {
			this.setState({ data })
		}
	}

	render() {
		const { name, email, phone, invoice_id, amount, payment_method, status_text, image } = this.state.data

		const details = [
			{
				title: 'Info Donatur',
				items: [
					{
						label: 'Nama',
						text: name
					},
					{
						label: 'Alamat',
						text: ''
					},
					{
						label: 'No Tlp',
						text: phone
					},
					{
						label: 'Email',
						text: email
					},
				]
			},
			{
				title: 'Detail Donasi',
				items: [
					{
						label: 'Tipe Donasi',
						text: (typeof this.state.data.campaign !== 'undefined') ? this.state.data.campaign.get_type.name : ''
					},
					{
						label: 'Metode Transfer',
						text: payment_method
					},
					{
						label: 'Status Donasi',
						text: status_text
					},
					{
						label: 'Catatan',
						text: ''
					}
				]
			}
		]
		return (
			<>
				<Main title={invoice_id}>
					<Row className="mt-4 mb-5">
						{details.map((detail, index) => {
							return (
								<Col md="4" key={index}>
									<InformationCard title={detail.title} items={detail.items} />
								</Col>
							)
						})}
						{(typeof payment_method !== 'undefind' && payment_method == 1) &&
							<Card className="card-transaction col-md-4">
								<CardBody>
									<CardTitle>
										<label>Bukti Pembayaran</label>
										<hr  className="mt-1 mb-1" />
										<div className="mb-2 hovereffect mt-3">
                      
											<img src={image} alt="foto bukti pembayaran" className="img-fluid img-thumbnail img-kwitansi-size"/>
                      <div className="overlay-kwitansi btn-kwitansi">
                        <span>
                          <a href="#" className="btn btn-table circle-table view-img mr-2" data-toggle="tooltip" data-placement="top" title="" data-original-title="Lihat Gambar"></a>
                        </span>
                        <span data-toggle="modal" role="button" data-target="#ModalMediaLibrary">
                          <a href="#" className="btn btn-table circle-table edit-table" data-toggle="tooltip" data-placement="top" title="" data-original-title="Ubah Gambar"></a>
                        </span>
                      </div>
                    </div>
										
									</CardTitle>
								</CardBody>
							</Card>
						}
						<div>

						</div>
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
										<th>
											{typeof this.state.data.campaign !== 'undefined' &&
												<img src={this.state.data.campaign.image} alt="poster donasi" />
											}
										</th>
										<td>
											{typeof this.state.data.campaign !== 'undefined' &&
												<p>{this.state.data.campaign.title}</p>
											}
										</td>
										<td>
											{typeof this.state.data.campaign !== 'undefined' &&
												<p>{this.state.data.campaign.get_type.name}</p>
											}

										</td>
										<td></td>
										<td>{amount}</td>
									</tr>
									<tr>
										<th><h1>Total :</h1></th>
										<td></td>
										<td></td>
										<td></td>
										<td>
											<h1>{amount}</h1>
										</td>
									</tr>
								</tbody>
							</Table>
						</Col>
					</Row>
				</Main>
			</>
		)
	}
}