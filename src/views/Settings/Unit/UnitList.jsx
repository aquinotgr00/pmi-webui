import React, { Component } from 'react'
import { Main } from "components"
import {
	listUnitApi,
	listCityApi,
	listMembershipApi,
	deleteUnitApi

} from 'services/api'

import { UnitTable } from './UnitTable'

export default class UnitList extends Component {

	constructor(props) {
		super(props)
		this.state = {
			error: false,
			isLoading: false,
			searchFor: null,
			memberFilter: null,
			cityFilter: null,
			memberData: [],
			cityData: [],
			unitData: [],
			isOpenDelete: false,
			dataId: null
		}
		this.loadUnits = this.loadUnits.bind(this)
		this.loadMembership = this.loadMembership.bind(this)
		this.loadCities = this.loadCities.bind(this)

		this.goToPage = this.goToPage.bind(this)
		this.handleSearch = this.handleSearch.bind(this)
		this.handleReset = this.handleReset.bind(this)
		this.handleFilterCity = this.handleFilterCity.bind(this)
		this.handleFilterParent = this.handleFilterParent.bind(this)
		this.toggleDelete = this.toggleDelete.bind(this)
		this.actionDelete = this.actionDelete.bind(this)
	}

	componentDidMount() {
		this.loadUnits()
		this.loadMembership()
		this.loadCities()
	}

	toggleDelete(dataId) {
		this.setState({ dataId })
		this.setState(prevState => ({
			isOpenDelete: !prevState.isOpenDelete
		}))
	}

	goToPage(page) {
		this.loadUnits(page, this.state.searchFor, this.state.cityFilter, this.state.memberFilter)
	}

	handleSearch(event) {
		const searchFor = event.target.value
		this.setState({ searchFor })
		this.loadUnits(this.state.page, searchFor, this.state.cityFilter, this.state.memberFilter)
	}

	handleReset() {
		let filter_city = document.getElementById('cityFilter')
		let filter_parent = document.getElementById('filterParent')
		
		let searchBox = document.getElementsByClassName('search-box')
		filter_city.value = 0
		filter_parent.value = 0
		
		searchBox.value = ""
		this.loadUnits()
	}

	handleFilterCity(event) {
		let cityFilter = event.target.value
		if (cityFilter === '0') {
			this.setState({ cityFilter: null })
		} else {
			this.setState({ cityFilter: cityFilter })
			this.loadUnits(this.state.page, this.state.searchFor, cityFilter, this.state.memberFilter)
		}
	}

	handleFilterParent(event) {
		const memberFilter = event.target.value
		if (memberFilter === '0') {
			this.setState({ memberFilter: null })
		} else {
			this.setState({ memberFilter })
			this.loadUnits(this.state.page, this.state.searchFor, this.state.cityFilter, memberFilter)
		}
	}

	async loadUnits(page = 1, searchFor = '', cityFilter = '', memberFilter = '') {
		try {
			const unitParams = new URLSearchParams()

			unitParams.append('page', page)

			if (searchFor) {
				unitParams.append('s', searchFor)
			}

			if (cityFilter) {
				unitParams.append('c_id', cityFilter)
			}

			if (memberFilter) {
				unitParams.append('p_id', memberFilter)
			}

			const response = await listUnitApi(unitParams)
			const { status } = response.data

			if (status === 'success') {
				const { data } = response.data
				const { current_page: currentPage, last_page: numberOfPages, data: unitData, from, to, total: numberOfEntries } = data
				this.setState({ isLoading: false, unitData, currentPage, numberOfPages, from, to, numberOfEntries })
			} else {
				this.setState({ isLoading: false, error: null })
			}

		} catch (error) {}
	}

	async loadMembership() {
		try {
			const response = await listMembershipApi()
			const { status } = response.data
			if (status === "success") {
				const { data: memberData } = response.data
				this.setState({ memberData })
			}
		} catch (error) {}
	}

	async loadCities() {
		try {
			const response = await listCityApi()
			const { status } = response.data
			if (status === "success") {
				const { data: cityData } = response.data
				this.setState({ cityData })
			}
		} catch (error) {}
	}

	async actionDelete() {
		const { dataId } = this.state
		const response = await deleteUnitApi(dataId)
		const { status } = response.data
		if (status === 'success') {
			this.toggleDelete()
			const { history } = this.props
			history.push(`/admin/settings/units`)
		}
		this.loadUnits()
	}

	render() {
		const { pathname } = this.props.location
		const {
			unitData
			, currentPage
			, from
			, to
			, numberOfEntries
			, cityData
			, memberData
			, isOpenDelete
		} = this.state
		let title = "Master Unit"

		return (
			<Main title={title}>
				<UnitTable
					pathname={pathname}
					currentPage={currentPage}
					numberOfPages={numberOfEntries}
					from={from}
					to={to}
					numberOfEntries={numberOfEntries}
					cityData={cityData}
					memberData={memberData}
					unitData={unitData}
					handleFilterCity={this.handleFilterCity}
					handleFilterParent={this.handleFilterParent}
					handleFilterSub={this.handleFilterSub}
					handleReset={this.handleReset}
					handleSearch={this.handleSearch}
					goToPage={this.goToPage}
					isOpen={isOpenDelete}
					toggle={this.toggleDelete}
					onAction={this.actionDelete}
				/>
			</Main>
		)
	}

}