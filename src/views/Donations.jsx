import React from 'react'
import { connect } from 'react-redux'
import { Main, InputItemsForm } from 'components'
import ucwords from 'utils/string'
import { Link, Redirect } from 'react-router-dom'
import { Row, Col, Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap'

import { Formik, Field } from 'formik'
import DonationSchema from 'validators/addDonation'
import { storeApi, getDonationList } from 'services/api'

function generatePreviewImgUrl(file, callback) {
	const reader = new FileReader()
	reader.readAsDataURL(file)
	reader.onloadend = e => callback(reader.result)
}

class Donations extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			inputItems: 1,
			file: null,
			selectedType: 'undefined',
			donations: [],
			redirect: false,
			typeDonate: null,
			previewImgUrl: require('assets/images/image-plus.svg'),
		}

		this.uploadImage  = React.createRef()
		this.submitButton = React.createRef()
		this.storeForm = React.createRef()
		this.handleStoreDonation = this.handleStoreDonation.bind(this)
		this.triggerUploadFile = this.triggerUploadFile.bind(this)
		this.submitForm = this.submitForm.bind(this)
		this.onChangeFile = this.onChangeFile.bind(this)
		this.loadDonationList = this.loadDonationList.bind(this)
		this.getDonationListByType = this.getDonationListByType.bind(this)
		this.addInputItem = this.addInputItem.bind(this)
	}

	triggerUploadFile = () => {
		this.uploadImage.current.click()
	}

	addInputItem = () => {
		this.setState({
			inputItems: this.state.inputItems + 1
		})
	}

	async loadDonationList(type = null, fund = 1) {
		if (type === null)
			type = 3
		const donationsList = await getDonationList(type, fund)
		const { data } = donationsList.data.data
		let listFromApi = data.map(donation => {
			return { value: donation.id, display: donation.title }
		})
		this.setState({ donations: [{ value: '', display: 'Pilih Judul Donasi' }].concat(listFromApi) })
	}

	componentDidMount() {
		if (this.props.match.params.donation === 'bulan-dana') {
			this.loadDonationList()
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.match.params.donation !== 'bulan-dana'
			&& this.state.donations.length > 0
			&& this.state.typeDonate === null
		) {
			this.setState({ donations: [] })
		}
		if (this.props.match.params.donation === 'bulan-dana') {
			if (this.state.typeDonate !== null) {
				this.setState({ typeDonate: null })
				this.setState({ donations: [] })
			}
			if (this.state.donations.length === 0) {
				this.loadDonationList()
			}
		}
	}

	getDonationListByType(ev) {
		let fund = 1
		if (this.props.match.params.donation === 'donasi-barang') {
			fund = 0
		}
		this.loadDonationList(ev.target.value, fund)
		this.setState({ selectedType: ev.target.value, typeDonate: ev.target.value })
	}

	submitForm = (ev) => {
		ev.stopPropagation()
		ev.preventDefault()
		this.submitButton.current.click()
	}

	onChangeFile(event) {
		event.stopPropagation()
		event.preventDefault()
		const file = event.target.files[0]
		this.setState({ file }) /// if you want to upload latter
	}

	async handleStoreDonation(value) {
		value.category = 1
		const storeResponse = await storeApi(value)
		const { status } = storeResponse.data
		if (status === 'success') {
			this.setState({ redirect: true })
		} else {
			alert('oops, something wrong.')
		}
	}

	render() {
		const { donation } = this.props.match.params
		const bulanDana = donation === 'bulan-dana'
		const itemDonation = donation === 'donasi-barang'
		const { previewImgUrl } = this.state

		const initialValues = {
			category: '',
			campaign_id: '',
			name: '',
			email: '',
			phone: '',
			amount: 0,
			fundraising: (itemDonation)? 0 : 1
		}
		if (this.state.redirect) {
			const url = '/admin/transactions/' + this.props.match.params.donation
			return <Redirect to={url} />;
		}

		return (
			<Main title={'Form ' + ucwords(donation.split('-').join(' '))}>
				<Formik
					initialValues={initialValues}
					enableReinitialize={true}
					validationSchema={DonationSchema}
					onSubmit={(values, { setSubmitting, resetForm }) => {						
						this.handleStoreDonation(values)
						setSubmitting(false)
						resetForm(initialValues)
					}}
				>
					{({
						errors,
						setFieldValue,
						handleSubmit,
						isSubmitting
					}) => (
							<Form innerRef={this.storeForm} onSubmit={handleSubmit}>
								<Row className='pl-3'>
									<Col md='6' className='pl-0'>
										<Input name='image' type='file' id='file-input'
											className='hidden-file-input'
											onChange={event => {
												const file = event.target.files[0]
												if (file) {
													setFieldValue('image_file', file)
													generatePreviewImgUrl(file, previewImgUrl => { this.setState({ previewImgUrl }) })
												}
											}}
										/>
										{!bulanDana &&
											<FormGroup>
												<Label for='judul'>Tipe Donasi</Label>
												<Field
													name="category"
													render={({ field }) => (
														<Input {...field} onChange={this.getDonationListByType} value={this.state.selectedType} type='select' id='category' invalid={errors.category !== undefined}>
															<option>Pilih Tipe Donasi</option>
															<option value='1'>Umum</option>
															<option value='2'>Khusus</option>
														</Input>
													)}
												/>
												{errors.category !== undefined ? <FormFeedback>{errors.category}</FormFeedback> : ''}
											</FormGroup>
										}
										<FormGroup>
											<Label for='judul'>Judul</Label>
											<Field
												name="campaign_id"
												render={({ field }) => (
													<Input {...field} type='select' id='campaign_id' invalid={errors.campaign_id !== undefined}>
														{/* <option>Pilih Judul Donasi</option> */}
														{this.state.donations.map(donation =>
															<option key={donation.value} value={donation.value}>{donation.display}</option>
														)}
													</Input>
												)}
											/>
											{errors.campaign_id !== undefined ? <FormFeedback>{errors.campaign_id}</FormFeedback> : ''}
										</FormGroup>
										<FormGroup>
											<Label for='donator'>Nama Donatur</Label>
											<Field
												name="name"
												render={({ field }) => (
													<Input {...field} type='text' id='name' placeholder='Masukkan Nama' invalid={errors.name !== undefined} />
												)}
											/>
											{errors.name !== undefined ? <FormFeedback>{errors.name}</FormFeedback> : ''}
										</FormGroup>
										<FormGroup>
											<Label for='email'>E-mail</Label>
											<Field
												name="email"
												render={({ field }) => (
													<Input {...field} type='email' id='email' placeholder='Masukkan E-mail' invalid={errors.email !== undefined} />
												)}
											/>
											{errors.email !== undefined ? <FormFeedback>{errors.email}</FormFeedback> : ''}
										</FormGroup>
										<FormGroup>
											<Label for='phone'>No Telepon</Label>
											<Field
												name="phone"
												render={({ field }) => (
													<Input {...field} type='text' id='phone' placeholder='Masukkan Telepon' invalid={errors.phone !== undefined} />
												)}
											/>
											{errors.phone !== undefined ? <FormFeedback>{errors.phone}</FormFeedback> : ''}
										</FormGroup>
										{!itemDonation &&
											<FormGroup>
												<Label for='amount'>Besar Donasi</Label>
												<Field
													name="amount"
													render={({ field }) => (
														<Input {...field} type='number' id='amount' placeholder='Masukkan Besar Donasi' invalid={errors.amount !== undefined} />
													)}
												/>
												{errors.amount !== undefined ? <FormFeedback>{errors.amount}</FormFeedback> : ''}
											</FormGroup>
										}
										{itemDonation &&
											<FormGroup>
												<Label for='donationItemHeading'>Barang Donasi</Label>
												{/* {this.state.inputItems.length.map(item => {
                      return <InputItemsForm item={item} />
                    })} */}
												{Array.from(Array(this.state.inputItems)).map((_, i) =>
													// console.log(i)
													<InputItemsForm key={i} data={i} />
												)}
												<div className='mt-4 link-tambah'>
													<Link to='#' onClick={this.addInputItem}>Tambah barang Donasi</Link>
												</div>
											</FormGroup>
										}
										<div className="d-flex flex-row-reverse mt-4">
											<Button onClick={this.submitForm} color='success' disabled={isSubmitting}>Simpan</Button>
										</div>
									</Col>

									<Col md='4' lg='5' className='pl-5 grs'>
										<div className="mb-4">
											<Label for='image'>Bukti Penerimaan</Label>
											<div className='mb-2'>
												<label htmlFor='file-input' >
													<img className='img-fluid img-thumbnail add-img-featured' src={previewImgUrl} alt='' />
												</label>
											</div>
											<small><span>Image size must be 1920x600 with maximum file size</span>
												<span>400 kb</span></small>
										</div>
									</Col>
								</Row>
								<Field
									name="fundraising"
									render={({ field }) => (
									<Input {...field} type='hidden' invalid={errors.fundraising !== undefined} />
								)} />
								<Button innerRef={this.submitButton} type='submit' disabled={isSubmitting} style={{ display: 'none' }}></Button>
							</Form>
						)}
				</Formik>
			</Main>
		)
	}
}

export default connect()(Donations)
