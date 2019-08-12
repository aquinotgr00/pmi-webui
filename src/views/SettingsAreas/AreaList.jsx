import React, { Component } from 'react'
import { listCityApi, listSubdistrictApi, listVillageApi } from 'services/api'
import { CityList } from './City/CityList'
import { SubdistrictList } from './Subdistrict/SubdistrictList'
import { UrbanVillageList } from './UrbanVillage/UrbanVillageList'

export default class AreaList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      searchFor: '',
      provinceFilter: null,
      cityFilter: null,
      cityFilterList: [],
      subdistrictFilter: null,
      subdistrictFilterList: [],
      isLoading: false,
      areaData: [],
      error: null
    }
    this.goToPage = this.goToPage.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.handleFilterCity = this.handleFilterCity.bind(this)
    this.handleFilterSubdistrict = this.handleFilterSubdistrict.bind(this)
  }

  componentDidMount() {
    this.loadArea()
  }

  goToPage(page) {
    this.loadArea(page, this.state.searchFor)
  }

  handleSearch(event) {
    const searchKeyword = event.target.value
    this.setState({ searchFor: searchKeyword })
    this.loadArea(this.state.page, searchKeyword, this.state.provinceFilter, this.state.cityFilter, this.state.subdistrictFilter)
  }

  handleReset() {
    let filter_city   = document.getElementById('filterCity')
    let filter_sub    = document.getElementById('filterSubdistrict')
    filter_city.value = 0
    if (filter_sub !== null) {
      filter_sub.value  = 0
    }
    this.loadArea()
  }

  handleFilterCity(event) {
    let filterCity = event.target.value
    if (filterCity == 0) {
      filterCity = null;
    }
    this.setState({ cityFilter: filterCity })
    this.loadArea(this.state.page, this.state.searchFor, this.state.provinceFilter, filterCity, this.state.subdistrictFilter)
  }

  handleFilterSubdistrict(event) {
    let filterSubdistrict = event.target.value
    if (filterSubdistrict == 0) {
      filterSubdistrict = null;
    }
    this.setState({ subdistrictFilter: filterSubdistrict })
    this.loadArea(this.state.page, this.state.searchFor, this.state.provinceFilter, this.state.cityFilter, filterSubdistrict)
  }


  async loadArea(page = 1, searchFor = '', provinceFilter = '', cityFilter = '', subdistrictFilter = '') {
    const areaParams = new URLSearchParams()
    const { title } = this.props

    areaParams.append('page', page)

    if (searchFor) {
      areaParams.append('s', searchFor)
    }

    if (provinceFilter) {
      areaParams.append('p_id', provinceFilter)
    }

    if (cityFilter) {
      areaParams.append('c_id', cityFilter)
    }

    if (subdistrictFilter) {
      areaParams.append('s_id', subdistrictFilter)
    }

    this.setState({ isLoading: true, error: null })
    let response = null;

    switch (title) {
      case 'kabupaten-kota':
        response = await listCityApi(areaParams)
        break
      case 'kecamatan':
        response = await listSubdistrictApi(areaParams)
        break;
      case 'kelurahan-desa':
        response = await listVillageApi(areaParams)
        break;
    }
    if (typeof response !== null) {
      const { status } = response.data
      if (status === 'success') {
        const { data } = response.data
        const { current_page: currentPage, last_page: numberOfPages, data: areaData, from, to, total: numberOfEntries, filter_city: cityFilterList, filter_subdistrict: subdistrictFilterList } = data
        this.setState({ isLoading: false, areaData, currentPage, numberOfPages, from, to, numberOfEntries, searchFor, cityFilterList, subdistrictFilterList })
      } else {
        this.setState({ isLoading: false, error: null })
      }
    }
  }

  render() {
    const { title } = this.props
    const { error } = this.state
    const { areaData, currentPage, numberOfPages, from, to, numberOfEntries, cityFilterList, subdistrictFilterList } = this.state
    const { pathname } = this.props.location

    return (
      <>
        {(title === 'kabupaten-kota') &&
          <CityList
            data={areaData}
            path={pathname}
            from={from}
            to={to}
            numberOfEntries={numberOfEntries}
            currentPage={currentPage}
            numberOfPages={numberOfPages}
            goToPage={this.goToPage}
            handleSearch={this.handleSearch}
            title={title}
          />
        }

        {(title === 'kecamatan') &&
          <SubdistrictList
            data={areaData}
            path={pathname}
            from={from}
            to={to}
            numberOfEntries={numberOfEntries}
            currentPage={currentPage}
            numberOfPages={numberOfPages}
            goToPage={this.goToPage}
            handleSearch={this.handleSearch}
            title={title}
            handleReset={this.handleReset}
            filterCity={cityFilterList}
            handleFilterCity={this.handleFilterCity}
          />
        }
        {(title === 'kelurahan-desa') &&
          <UrbanVillageList
            data={areaData}
            path={pathname}
            from={from}
            to={to}
            numberOfEntries={numberOfEntries}
            currentPage={currentPage}
            numberOfPages={numberOfPages}
            goToPage={this.goToPage}
            handleSearch={this.handleSearch}
            title={title}
            handleReset={this.handleReset}
            filterCity={cityFilterList}
            filterSubdistrict={subdistrictFilterList}
            handleFilterCity={this.handleFilterCity}
            handleFilterSubdistrict={this.handleFilterSubdistrict}
          />
        }

      </>
    )
  }
}