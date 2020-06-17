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
      cityFilter: null,
      subdistrictFilter: null,
      isLoading: false,
      cities:[],
      subdistricts:[],
      villages:[],
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
    this.loadCities = this.loadCities.bind(this)
    this.loadSubdistricts = this.loadSubdistricts.bind(this)
    this.loadVillages = this.loadVillages.bind(this)
  }

  componentDidMount() {
    this.loadCities()
    this.loadSubdistricts()
    this.loadVillages()
  }

  goToPage(page) {
    const { title } = this.props
    if(title === 'kabupaten-kota'){
      this.loadCities(page, this.state.searchFor)
    }
    if(title === 'kecamatan'){
      this.loadSubdistricts(page, this.state.searchFor, this.state.cityFilter)
    }
    if(title === 'kelurahan-desa'){
      this.loadVillages(page, this.state.searchFor, this.state.cityFilter, this.state.subdistrictFilter)
    }
    
  }

  toggleDelete(dataId) {
    this.setState({ dataId })
    this.setState(prevState => ({
      isOpenDelete: !prevState.isOpenDelete
    }))
  }

  handleSearch(event) {
    const { title } = this.props
    const searchKeyword = event.target.value
    this.setState({ searchFor: searchKeyword })
    
    if (title === 'kabupaten-kota') {
      this.loadCities(this.state.page, searchKeyword)  
    }
    
    if(title === 'kecamatan'){
      this.loadSubdistricts(this.state.page, searchKeyword, this.state.cityFilter)
    }

    if(title === 'kelurahan-desa'){
      this.loadVillages(this.state.page, searchKeyword,this.state.cityFilter, this.state.subdistrictFilter)
    }
  }

  handleReset() {
    let filter_city = document.getElementById('filterCity')
    let filter_sub = document.getElementById('filterSubdistrict')
    filter_city.value = 0
    if (filter_sub !== null) {
      filter_sub.value = 0
    }
    this.loadCities()
    this.loadSubdistricts()
    this.loadVillages()
  }

  handleFilterCity(event) {
    let cityFilter = event.target.value
    if (cityFilter === 0) {
      cityFilter = null;
    }
    this.setState({ cityFilter })
    this.loadSubdistricts(this.state.page, this.state.searchFor,cityFilter)
  }

  handleFilterSubdistrict(event) {
    let filterSubdistrict = event.target.value
    if (filterSubdistrict === 0) {
      filterSubdistrict = null;
    }
    this.setState({ subdistrictFilter: filterSubdistrict })
    this.loadVillages(this.state.page, this.state.searchFor,this.state.cityFilter,filterSubdistrict)
  }

  async loadCities(page = 1, searchFor = ''){
    const { title } = this.props
    const areaParams = new URLSearchParams()
    areaParams.append('page', page)
    if (searchFor) {
      areaParams.append('s', searchFor)
    }
    const response = await listCityApi(areaParams)
    if (response !== null) {
      const { status } = response.data
      if (status === 'success') {
        const { data } = response.data
        if(title === 'kabupaten-kota'){
          const { current_page: currentPage, last_page: numberOfPages, data: cities, from, to, total: numberOfEntries } = data
          this.setState({ isLoading: false, cities, currentPage, numberOfPages, from, to, numberOfEntries, searchFor })
        }else{
          const {  data: cities } = data
          this.setState({ cities })
        }
      }
    }
  }

  async loadSubdistricts(page = 1, searchFor='',cityFilter=''){
    const { title } = this.props
    const areaParams = new URLSearchParams()
    areaParams.append('page', page)
    if (searchFor) {
      areaParams.append('s', searchFor)
    }
    if (cityFilter) {
      areaParams.append('c_id', cityFilter)
    }
    const response = await listSubdistrictApi(areaParams)
    if (response !== null) {
      const { status } = response.data
      if (status === 'success') {
        const { data } = response.data
        if (title === 'kecamatan') {
          const { current_page: currentPage, last_page: numberOfPages, data: subdistricts, from, to, total: numberOfEntries } = data
          this.setState({ isLoading: false, subdistricts, currentPage, numberOfPages, from, to, numberOfEntries, searchFor })
        }else{
          const { data: subdistricts } = data
          this.setState({ subdistricts })
        }
      }
    }
  }

  async loadVillages(page = 1, searchFor ='',cityFilter='',subdistrictFilter=''){
    const { title } = this.props
    const areaParams = new URLSearchParams()
    areaParams.append('page', page)
    if (searchFor) {
      areaParams.append('s', searchFor)
    }
    if (cityFilter) {
      areaParams.append('c_id', cityFilter)
    }
    if (subdistrictFilter) {
      areaParams.append('s_id', subdistrictFilter)
    }
    const response = await listVillageApi(areaParams)
    if (response !== null) {
      const { status } = response.data
      if (status === 'success') {
        const { data } = response.data
        if(title === 'kelurahan-desa'){
          const { current_page: currentPage, last_page: numberOfPages, data: villages, from, to, total: numberOfEntries } = data
          this.setState({ isLoading: false, villages, currentPage, numberOfPages, from, to, numberOfEntries, searchFor })
        }else{
          const { data: villages } = data
          this.setState({villages})
        }
        
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
        this.loadCities()
        this.loadSubdistricts()
        this.loadVillages()
      }
    }
  }

  render() {
    const { title } = this.props
    const { 
      currentPage, 
      numberOfPages, 
      from, 
      to, 
      numberOfEntries, 
      isOpenDelete,
      cities,
      subdistricts,
      villages
    } = this.state
    const { pathname } = this.props.location

    return (
      <>
        {(title === 'kabupaten-kota') &&
          <CityList
            title={title}
            data={cities}
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
            data={subdistricts}
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
            filterCity={cities}
            handleFilterCity={this.handleFilterCity}
            toggle={this.toggleDelete}
            isOpen={isOpenDelete}
          />
        }
        {(title === 'kelurahan-desa') &&
          <UrbanVillageList
            data={villages}
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
            filterCity={cities}
            filterSubdistrict={subdistricts}
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