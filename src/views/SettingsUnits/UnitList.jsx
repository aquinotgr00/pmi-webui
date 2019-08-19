import React, { Component } from 'react'
import { Main } from "components"
import { PaginationLink, AddNewActionButton, Tool } from 'components'
import {
	listUnitApi,
	listCityApi,
	listParentMembershipApi,
	listMembershipApi,
	deleteUnitApi

} from 'services/api'

import ucwords from "utils/string"
import { UnitTable } from './UnitTable'

export default class UnitList extends Component {

	constructor(props) {
		super(props)
		this.state = {
			error: false,
			isLoading: false,
			searchFor: null,
			isOpen: false,
			parentFilter: null,
			subFilter: null,
			cityFilter: null,
			parentData: [],
			subData: [],
			cityData: [],
			unitData: []
		}
		this.loadUnits = this.loadUnits.bind(this)
		this.loadParentMembers = this.loadParentMembers.bind(this)
		this.loadSubMembers = this.loadSubMembers.bind(this)
		this.loadCities = this.loadCities.bind(this)

		this.goToPage = this.goToPage.bind(this)
		this.handleSearch = this.handleSearch.bind(this)
		this.handleReset = this.handleReset.bind(this)
		this.handleFilterCity = this.handleFilterCity.bind(this)
		this.handleFilterParent = this.handleFilterParent.bind(this)
		this.handleFilterSub = this.handleFilterSub.bind(this)
		this.toggleDelete = this.toggleDelete.bind(this)
		this.confirmDelete = this.confirmDelete.bind(this)
	}

	componentDidMount() {
		this.loadUnits()
		this.loadParentMembers()
		this.loadSubMembers()
		this.loadCities()
	}

	toggleDelete() {
		this.setState(prevState => ({
			isOpen: !prevState.isOpen
		}))
	}

	goToPage(page) {
		this.loadUnits(page, this.state.searchFor, this.state.cityFilter, this.state.parentFilter, this.state.subFilter)
	}

	handleSearch(event) {
		const searchFor = event.target.value
		this.setState({ searchFor })
		this.loadUnits(this.state.page, searchFor, this.state.cityFilter, this.state.parentFilter, this.state.subFilter)
	}

	handleReset() {
		let filter_city = document.getElementById('cityFilter')
		let filter_parent = document.getElementById('filterParent')
		let filter_sub = document.getElementById('filterSub')
		let searchBox = document.getElementsByClassName('search-box')
		filter_city.value = 0
		filter_parent.value = 0
		filter_sub.value = 0
		searchBox.value = ""
		this.loadUnits()
	}

	handleFilterCity(event) {
		let cityFilter = event.target.value
		if (cityFilter === '0') {
			this.setState({ cityFilter: null })
		} else {
			this.setState({ cityFilter: cityFilter })
			this.loadUnits(this.state.page, this.state.searchFor, cityFilter, this.state.parentFilter, this.state.subFilter)
		}
	}

	handleFilterParent(event) {
		const parentFilter = event.target.value
		if (parentFilter === '0') {
			this.setState({ parentFilter: null })
		} else {
			this.setState({ parentFilter })
			this.loadUnits(this.state.page, this.state.searchFor, this.state.cityFilter, parentFilter, this.state.subFilter)
			this.loadSubMembers(parentFilter)
		}
	}

	handleFilterSub(event) {
		const subFilter = event.target.value
		if (subFilter === '0') {
			this.setState({ subFilter: null })
		} else {
			this.setState({ subFilter })
			this.loadUnits(this.state.page, this.state.searchFor, this.state.cityFilter, this.state.parentFilter, subFilter)
		}
	}

	async loadUnits(page = 1, searchFor = '', cityFilter = '', parentFilter = '', subFilter = '') {
		try {
			const memberParams = new URLSearchParams()

			memberParams.append('page', page)

			if (searchFor) {
				memberParams.append('s', searchFor)
			}

			if (cityFilter) {

				memberParams.append('c_id', cityFilter)
			}

			if (parentFilter) {
				memberParams.append('p_id', parentFilter)
			}

			if (subFilter) {
				memberParams.append('s_id', subFilter)
			}

			const response = await listUnitApi(memberParams)
			const { status } = response.data

			if (status === 'success') {
				const { data } = response.data
				const { current_page: currentPage, last_page: numberOfPages, data: unitData, from, to, total: numberOfEntries } = data
				this.setState({ isLoading: false, unitData, currentPage, numberOfPages, from, to, numberOfEntries })
			} else {
				this.setState({ isLoading: false, error: null })
			}

		} catch (error) {
			console.log(error)
		}
	}

	async loadParentMembers() {
		try {
			const response = await listParentMembershipApi()
			const { status } = response.data
			if (status === "success") {
				const { data: parentData } = response.data
				this.setState({ parentData })
			}
		} catch (error) {
			console.log(error)
		}
	}

	async loadSubMembers(parent_id = '') {
		try {
			const memberParams = new URLSearchParams()
			memberParams.append('sub', 1)
			if (parent_id) {
				memberParams.append('p_id', parent_id)
			}
			const response = await listMembershipApi(memberParams)
			const { status } = response.data
			if (status === "success") {
				const { data: subData } = response.data
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

	async confirmDelete(unitId) {
		const response = await deleteUnitApi(unitId)
		const { status } = response.data
		if (status === 'success') {
			this.toggleDelete()
			const { history } = this.props
			history.push(`/admin/units`)
		}
		this.loadUnits()
	}

	render() {
		const { history } = this.props
		const { pathname } = this.props.location
		const {
			unitData
			, currentPage
			, numberOfPages
			, from
			, to
			, numberOfEntries
			, cityData
			, parentData
			, subData
			, isOpen
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
					parentData={parentData}
					subData={subData}
					unitData={unitData}
					handleFilterCity={this.handleFilterCity}
					handleFilterParent={this.handleFilterParent}
					handleFilterSub={this.handleFilterSub}
					handleReset={this.handleReset}
					handleSearch={this.handleSearch}
					goToPage={this.goToPage}
					isOpen={isOpen}
					toggle={this.toggleDelete}
					onAction={this.confirmDelete}
				/>
			</Main>
		)
	}

}