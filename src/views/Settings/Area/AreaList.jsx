import React, { Component } from 'react'
import {
  listCityApi,
  listSubdistrictApi,
  listVillageApi,
  deleteCityApi,
  deleteSubdistrictApi,
  deleteVillageApi
} from 'services/api'
import { CityList } from './City/CityList'
import { SubdistrictList } from './Subdistrict/SubdistrictList'
import { UrbanVillageList } from './UrbanVillage/UrbanVillageList'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'

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
      error: null,
      isOpenDelete: false,
      dataId: null
    }
    this.goToPage = this.goToPage.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.handleFilterCity = this.handleFilterCity.bind(this)
    this.handleFilterSubdistrict = this.handleFilterSubdistrict.bind(this)
    this.actionDelete = this.actionDelete.bind(this)
    this.toggleDelete = this.toggleDelete.bind(this)
  }

  componentDidMount() {
    this.loadArea()
  }

  goToPage(page) {
    this.loadArea(page, this.state.searchFor)
  }

  toggleDelete(dataId) {
    this.setState({ dataId })
    this.setState(prevState => ({
      isOpenDelete: !prevState.isOpenDelete
    }))
  }

  handleSearch(event) {
    const searchKeyword = event.target.value
    this.setState({ searchFor: searchKeyword })
    this.loadArea(this.state.page, searchKeyword, this.state.provinceFilter, this.state.cityFilter, this.state.subdistrictFilter)
  }

  handleReset() {
    let filter_city = document.getElementById('filterCity')
    let filter_sub = document.getElementById('filterSubdistrict')
    filter_city.value = 0
    if (filter_sub !== null) {
      filter_sub.value = 0
    }
    this.loadArea()
  }

  handleFilterCity(event) {
    let filterCity = event.target.value
    if (filterCity === 0) {
      filterCity = null;
    }
    this.setState({ cityFilter: filterCity })
    this.loadArea(this.state.page, this.state.searchFor, this.state.provinceFilter, filterCity, this.state.subdistrictFilter)
  }

  handleFilterSubdistrict(event) {
    let filterSubdistrict = event.target.value
    if (filterSubdistrict === 0) {
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
    let response = null
    switch (title) {
      case 'kabupaten-kota':
        response = await listCityApi(areaParams)
        break
      case 'kecamatan':
        response = await listSubdistrictApi(areaParams)
        break
      case 'kelurahan-desa':
        response = await listVillageApi(areaParams)
        break
      default:
        response = null
        break
    }
    if (response !== null) {
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

  async actionDelete() {
    const { title } = this.props
    const { dataId } = this.state
    let response = null
    switch (title) {
      case 'kabupaten-kota':
        response = await deleteCityApi(dataId)
        break
      case 'kecamatan':
        response = await deleteSubdistrictApi(dataId)
        break
      case 'kelurahan-desa':
        response = await deleteVillageApi(dataId)
        break
      default:
        response = null
        break
    }
    if (response !== null) {
      const { status } = response.data
      if (status === 'success') {
        this.toggleDelete()
        this.loadArea()
      }
    }
  }

  render() {
    const { title, history } = this.props
    const { areaData, currentPage, numberOfPages, from, to, numberOfEntries, cityFilterList, subdistrictFilterList, isOpenDelete } = this.state
    const { pathname } = this.props.location

    return (
      <>
        {(title === 'kabupaten-kota') &&
          <CityList
            title={title}
            data={areaData}
            path={pathname}
            from={from}
            to={to}
            numberOfEntries={numberOfEntries}
            currentPage={currentPage}
            numberOfPages={numberOfPages}
            goToPage={this.goToPage}
            handleSearch={this.handleSearch}
            toggle={this.toggleDelete}
            isOpen={isOpenDelete}
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
            toggle={this.toggleDelete}
            isOpen={isOpenDelete}
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
            toggle={this.toggleDelete}
            isOpen={isOpenDelete}
          />
        }
        <Modal isOpen={isOpenDelete} toggle={this.toggleDelete}>
          <ModalHeader >Hapus Data</ModalHeader>
          <ModalBody>
            <p>Anda yakin menghapus data ini?</p>
          </ModalBody>
          <ModalFooter>
            <Button color='secondary' onClick={this.toggleDelete}>Batal</Button>{' '}
            <Button color='danger' onClick={this.actionDelete}>Hapus</Button>
          </ModalFooter>
        </Modal>
      </>
    )
  }
}