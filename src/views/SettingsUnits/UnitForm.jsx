import React, { Component } from 'react'
import { Main } from "components"
import { Button, FormGroup, FormFeedback, Input } from 'reactstrap'
import { Formik, Form, Field } from "formik"
import {
	listCityApi,
	listMembershipApi,
	detailsUnitApi,
	storeUnitApi,
	updateUnitApi
} from 'services/api'
import { UnitTable } from './UnitTable'
import ucwords from "utils/string"
import UnitSchema from "validators/unit"

export default class UnitForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			parentFilter: null,
			subFilter: null,
			cityFilter: null,
			parentData: [],
			subData: [],
			cityData: [],
			unit: {
				name: '',
				city_id: '',
				membership_id: '',
				sub_member_id: ''
			}
		}

		this.loadMembership = this.loadMembership.bind(this)
		this.loadCities = this.loadCities.bind(this)
		this.loadUnit = this.loadUnit.bind(this)
		this.handleSaveUnit = this.handleSaveUnit.bind(this)
		this.handleFilterParent = this.handleFilterParent.bind(this)
	}

	componentDidMount() {
		const { unitId } = this.props.match.params
		if (unitId) {
			this.loadUnit(unitId)
		}
		this.loadMembership(0)
		this.loadCities()
	}

	handleFilterParent(event) {
		const parentFilter = event.target.value
		if (parentFilter === '0') {
			this.setState({ parentFilter: null })
		} else {
			this.setState({ parentFilter })
			this.loadMembership(parentFilter)
		}
	}

	async handleSaveUnit(values) {
		try {
			const { unitId } = this.props.match.params
			const response = unitId
				? await updateUnitApi(unitId, values)
				: await storeUnitApi(values)

			const { status } = response.data
			if (status === "success") {
				const { history } = this.props
				history.push(`/admin/units`)
			}

		} catch (error) {
			// TODO : handle errors
			console.log(error)
		}
	}

	async loadUnit(unitId) {
		try {
			const response = await detailsUnitApi(unitId)
			const { status } = response.data

			if (status === "success") {
				const { data: unit } = response.data
				this.setState({ unit })
			} else {
				// TODO : handle error
				this.setState({ isLoading: false, error: null })
			}
		} catch (error) {
			// TODO : handle error
		}
	}


	async loadMembership(parent_id = '') {
		try {
			const memberParams = new URLSearchParams()
			if (parent_id) {
				memberParams.append('l', parent_id)
			}
			const response = await listMembershipApi(memberParams)
			const { status } = response.data
			if (status === "success") {
				const { data: subData } = response.data
				if (parseInt(parent_id) === 0) {
					this.setState({ parentData: subData })
				}
				this.setState({ subData })
			}
		} catch (error) {
			console.log(error)
		}
	}

	async loadCities() {
		try {
			const response = await listCityApi()
			const { status } = response.data
			if (status === "success") {
				const { data: cityData } = response.data
				this.setState({ cityData })
			}
		} catch (error) {
			console.log(error)
		}
	}


	render() {
		const { unitId } = this.props.match.params
		const title = (unitId) ? "Edit Unit" : "Tambah Unit"
		const { parentData, subData, cityData, unit } = this.state
		return (
			<Main title={title}>
				<Formik
					enableReinitialize
					validationSchema={UnitSchema}
					initialValues={unit}
					onSubmit={(values, { setSubmitting }) => {
						this.handleSaveUnit(values)
						setSubmitting(false)
					}}
				>
					{({
						errors,
						handleSubmit,
						isSubmitting
					}) => (
							<Form className='col-md-6 col-lg7 pl-0' onSubmit={handleSubmit}>
								<FormGroup>
									<label htmlFor='name'>Unit</label>
									<Field
										name='name'
										render={({ field }) => (
											<Input {...field} id='name' maxLength={255} invalid={errors.name !== undefined} />
										)}
									/>
									{errors.name !== undefined ? <FormFeedback>{errors.name}</FormFeedback> : ''}
								</FormGroup>
								<FormGroup>
									<label htmlFor='city_id'>Kabupaten/Kota</label>
									<Field
										name='city_id'
										render={({ field }) => (
											<Input
												type="select"
												{...field}
												id='city_id'
												invalid={errors.city_id !== undefined}>
												<option value="0">Pilih Kabupaten/Kota</option>
												{cityData.map((city, key) => {
													return (
														<option key={key} value={city.id}>{city.name}</option>
													)
												})}
											</Input>
										)}
									/>
									{errors.city_id !== undefined ? <FormFeedback>{errors.city_id}</FormFeedback> : ''}
								</FormGroup>
								<FormGroup>
									<label htmlFor='membership_id'>Jenis Anggota</label>
									<Field
										name='membership_id'
										render={({ field, form }) => (
											<Input 
											type="select" 
											{...field} 
											id='membership_id' 
											invalid={errors.membership_id !== undefined} 
											onChange={e => {
												const membershipId = e.target.value
												this.handleFilterParent(e)
												form.setFieldValue('membership_id', membershipId)
											}}
											>
												<option value="0">Pilih Jenis Anggota</option>
												{parentData.map((parent, key) => {
													return (
														<option key={key} value={parent.id}>{parent.name}</option>
													)
												})}
											</Input>
										)}
									/>
									{errors.membership_id !== undefined ? <FormFeedback>{errors.membership_id}</FormFeedback> : ''}
								</FormGroup>
								<FormGroup>
									<label htmlFor='sub_member_id'>Sub Jenis Anggota</label>
									<Field
										name='sub_member_id'
										render={({ field }) => (
											<Input type="select" {...field} id='sub_member_id' invalid={errors.sub_member_id !== undefined} >
												<option value="0">Pilih Sub Jenis Anggota</option>
												{subData.map((sub, key) => {
													return (
														<option key={key} value={sub.id}>{sub.name}</option>
													)
												})}
											</Input>
										)}
									/>
									{errors.sub_member_id !== undefined ? <FormFeedback>{errors.sub_member_id}</FormFeedback> : ''}
								</FormGroup>
								<div className='float-right'>
									<Button type='submit' color='success' disabled={isSubmitting}>Simpan</Button>
								</div>
							</Form>
						)}
				</Formik>
			</Main>
		)
	}
}