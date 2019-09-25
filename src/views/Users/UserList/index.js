import React, { Component } from 'react'
import { PaginationLink, Tool, VolunteerFilter } from 'components'
import { AddNewActionButton } from 'components/ActionButtons'
import { Administrator } from './Administrator'
import { Donator } from './Donator'
import { Volunteer } from './Volunteer'
import { VolunteerModeration } from './VolunteerModeration'
import {
  listUserApi,
  updateActiveUserApi,
  getDonatorList,
  getVolunteerList,
  listCityApi,
  listMembershipApi,
  getSubdistrictListApi,
  getUnitListApi,
  exportVolunteerToPdfApi,
  exportVolunteerProfilePdf,
  exportVolunteerToPrintApi,
  postVolunteerUpdateApi
} from 'services/api'

export default class UserList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 1,
      searchFor: '',
      isLoading: false,
      userData: [],
      error: null,
      modal: false,
      rejectModal: false,
      filters: {},
      subdistricts: [],
      units: [],
      cities: [],
      memberships: [],
      tooltipOpen: false
    }

    this.volunteerTable = React.createRef()

    this.loadUser = this.loadUser.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.goToPage = this.goToPage.bind(this)
    this.handleDisableEnable = this.handleDisableEnable.bind(this)
    this.toggleProfileModal = this.toggleProfileModal.bind(this)
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.getCityList = this.getCityList.bind(this)
    this.getUnitList = this.getUnitList.bind(this)
    this.getSubdistrictList = this.getSubdistrictList.bind(this)
    this.getMembershipList = this.getMembershipList.bind(this)
    this.tooltipToggle = this.tooltipToggle.bind(this)
    this.handleExportPdf = this.handleExportPdf.bind(this)
    this.handleApprove = this.handleApprove.bind(this)
    this.handleExportPrint = this.handleExportPrint.bind(this)
    this.handleReset = this.handleReset.bind(this)
  }

  componentDidMount() {
    this.handleReset()
  }

  async loadUser(page = 1, searchFor = '', filters = {}) {
    const userParams = new URLSearchParams()
    const { user } = this.props

    userParams.append('page', page)

    for (const param in filters) {
      if (filters[param] !== null) {
        userParams.append(param, filters[param])
      }
    }

    userParams.append('s', searchFor)

    this.setState({ isLoading: true, error: null })

    let response = { data: null }
    switch (user) {
      case 'admin':
        response = await listUserApi(userParams)
        break
      case 'donator':
        response = await getDonatorList(userParams)
        break
      case 'volunteer':
        userParams.append('v', 1)
        response = await getVolunteerList(userParams)
        break
      case 'volunteer-moderation':
        userParams.append('v', 0)
        response = await getVolunteerList(userParams)
        break
      default:
        response = { data: null }
        break
    }

    const { status } = response.data
    if (status === 'success') {
      const { data } = response.data
      const { current_page: currentPage, last_page: numberOfPages, data: userData, from, to, total: numberOfEntries } = data.admins
      this.setState({ isLoading: false, userData, currentPage, numberOfPages, from, to, numberOfEntries, searchFor, filters })
    }
  }

  tooltipToggle() {
    this.setState({ tooltipOpen: !this.state.tooltipOpen })
  }

  toggleProfileModal(type = 'profile') {
    if (type === 'profile') {
      const modal = true
      this.setState({ modal })
    } else if (type === 'reject') {
      const rejectModal = true
      this.setState({ rejectModal })
    }
  }

  handleFilterChange(filters) {
    if (filters.c) {
      const subdistrictParams = new URLSearchParams()
      subdistrictParams.append('c_id', filters.c)
      this.getSubdistrictList(subdistrictParams)
    }
    this.setState({ selectedSubdistricts: filters.sd, selectedUnit: filters.u, selectedCity: filters.c })
    this.loadUser(this.state.page, this.state.searchFor, { ...this.state.filters, ...filters })
  }

  handleReset() {
    this.loadUser()
    this.getCityList()
    this.getUnitList()
    this.getSubdistrictList()
    this.getMembershipList()

    const { user } = this.props
    if (user === 'volunteer') {
      let select_member   = document.getElementById('select-member')
      select_member.value = null
      let select_city     = document.getElementById('select-city')
      select_city.value   = null
      let select_subdistrict    = document.getElementById('select-subdistrict')
      select_subdistrict.value  = null
      let select_unit           = document.getElementById('select-unit')
      select_unit.value         = null
    }
  }

  async getMembershipList() {
    const response = await listMembershipApi()
    const { data: memberships } = response.data
    this.setState({ memberships })
  }

  async getCityList(param) {
    const response = await listCityApi(param)
    const { data: cities } = response.data
    this.setState({ cities })
  }

  async getUnitList(param) {
    const response = await getUnitListApi(param)
    const { data: units } = response.data
    this.setState({ units })
  }

  async getSubdistrictList(param) {
    const response = await getSubdistrictListApi(param)
    const { data: subdistricts } = response.data
    this.setState({ subdistricts })
  }

  async handleExportPrint() {
    const response = await exportVolunteerToPrintApi(this.state.filters)
    const { html } = response.data.data

    var mywindow = window.open('', 'Print', 'height=600,width=800');
    mywindow.document.write(html);

    mywindow.document.close();
    mywindow.focus()
    mywindow.print();
    mywindow.close();

    return true;
  }

  handleSearch(event) {
    const searchKeyword = event.target.value
    this.loadUser(this.state.page, searchKeyword)
  }

  goToPage(page) {
    this.setState({ page })
    this.loadUser(page, this.state.searchFor)
  }

  async handleDisableEnable(event) {
    let params = event.target.value.split(',')
    let oposite = (params[1] === 1) ? 'disable' : 'enable'
    let oposite_msg = (params[1] === 1) ? 'Non-aktif' : 'Aktif'
    const response = await updateActiveUserApi(params[0], oposite)
    const { status } = response.data
    if (status === 'success') {
      const { data } = response.data
      this.setState({ userData: this.state.userData.map(item => item.id === data.id ? data : item) })
      alert('Berhasil me' + oposite_msg + 'kan Admin')
    }
  }

  async handleExportPdf(profile = null) {
    let response = { data: null }
    switch (true) {
      case profile !== null:
        response = await exportVolunteerProfilePdf(profile)
        break

      default:
        response = await exportVolunteerToPdfApi(this.state.filters)
        break
    }

    const { status } = response.data
    if (status === 'success') {
      const { url } = response.data.data
      window.open(url, "_blank")
    }
  }

  handleApprove(volunteerId, data, index) {
    index--
    data._method = 'PUT'
    const response = postVolunteerUpdateApi(volunteerId, data)
    const userData = this.state.userData
    userData.splice(index, 1)
    console.log(index)
    this.setState({ userData })   
  }

  renderUserList(user) {
    const { userData, currentPage, numberOfPages, from, to, numberOfEntries } = this.state

    const { pathname } = this.props.location
    return (
      <>
        <PaginationLink
          rowFrom={from}
          rowTo={to}
          numberOfEntries={numberOfEntries}
          currentPage={currentPage}
          numberOfPages={numberOfPages}
          onPageChange={this.goToPage}
        />
        {(user === 'admin') && <Administrator data={userData} path={pathname} toggleEnable={this.handleDisableEnable} />}
        {(user === 'donator') && <Donator data={userData} path={pathname} />}
        {(user === 'volunteer') &&
          <Volunteer
            forwadedRef={this.volunteerTable}
            data={userData}
            path={pathname}
            handleExportPdf={this.handleExportPdf}
            toggleProfileModal={this.toggleProfileModal}
            isOpen={this.state.modal}
          />}
        {(user === 'volunteer-moderation') &&
          <VolunteerModeration
            data={userData}
            path={pathname}
            handleApprove={this.handleApprove}
            toggleProfileModal={this.toggleProfileModal}
            isOpen={this.state.modal}
            rejectModalOpen={this.state.rejectModal}
          />}
      </>
    )
  }

  render() {
    const { user, title } = this.props
    const { error, cities, subdistricts, units, memberships } = this.state
    return (
      <>
        <Tool onSearch={this.handleSearch}>
          {user === 'admin' &&
            <AddNewActionButton path={`${user}/create`} tooltipText={`Tambah ${title} Baru`} />
          }
        </Tool>
        {user === 'volunteer' &&
          <VolunteerFilter
            handleReset={this.handleReset}
            onChange={this.handleFilterChange}
            memberships={memberships}
            cities={cities}
            subdistricts={subdistricts}
            units={units}
            tootltipOpen={this.state.tooltipOpen}
            tooltipToggle={this.tooltipToggle}
            handleExportPdf={this.handleExportPdf}
            volunteerTable={this.volunteerTable.current}
            handlePrint={this.handleExportPrint}
          />
        }
        {error
          ? <div>Error</div>
          : this.renderUserList(user)
        }
      </>
    )
  }
}
