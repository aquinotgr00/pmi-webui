import React, { Component } from "react"
import { Main } from "components"
import { MemberList } from "./MemberList"
import { SubMemberList } from "./SubMemberList"
import { PaginationLink, AddNewActionButton, Tool } from 'components'
import { listMembershipApi, deleteMembershipApi } from 'services/api'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import ucwords from "utils/string"

export default class MembershipList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: false,
      isLoading: false,
      memberData: [],
      parentFilter: null,
      searchFor: null,
      isOpenDelete: false,
      dataId: null
    }
    this.loadMembers = this.loadMembers.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.goToPage = this.goToPage.bind(this)
    this.actionDelete = this.actionDelete.bind(this)
    this.toggleDelete = this.toggleDelete.bind(this)
    this.handleOnChangeParent = this.handleOnChangeParent.bind(this)
  }

  componentDidMount() {
    this.loadMembers()

  }

  goToPage(page) {
    this.loadMembers(page, this.state.searchFor, this.state.parentFilter)
  }

  handleOnChangeParent(event) {
    const parentFilter = event.target.value
    this.setState({ parentFilter })
    this.loadMembers(this.state.page, this.state.searchFor, parentFilter)
  }

  handleSearch(event) {
    const searchKeyword = event.target.value
    this.setState({ searchFor: searchKeyword })
    this.loadMembers(this.state.page, searchKeyword, this.state.parentFilter)
  }

  handleReset() {
    let filterMember = document.getElementById('filterMember')
    let searchBox = document.getElementsByClassName('search-box')
    filterMember.value = 0
    searchBox.value = ""
    this.loadMembers();
  }

  toggleDelete(dataId) {
    this.setState({ dataId })
    this.setState(prevState => ({
      isOpenDelete: !prevState.isOpenDelete
    }))
  }

  async actionDelete() {
    const { type } = this.props.match.params
    const { dataId }  = this.state
    const response = await deleteMembershipApi(dataId)
    const { status } = response.data
    if (status === 'success') {
      this.toggleDelete()
      this.loadMembers();
      const { history } = this.props
      history.push(`/admin/membership`)
    }
  }

  async loadMembers(page = 1, searchFor = '', parentFilter = '') {
    const memberParams = new URLSearchParams()
    memberParams.append('page', page)
    memberParams.append('sub', 1)
    
    if (searchFor) {
      memberParams.append('s', searchFor)
    }

    if (parentFilter) {
      memberParams.append('l', parentFilter)
    }

    this.setState({ isLoading: true, error: null })

    const response = await listMembershipApi(memberParams)
    if (response !== null) {
      const { status } = response.data
      if (status === 'success') {
        const { data } = response.data
        const { current_page: currentPage, last_page: numberOfPages, data: memberData, from, to, total: numberOfEntries } = data
        this.setState({ isLoading: false, memberData, currentPage, numberOfPages, from, to, numberOfEntries, searchFor })
      } else {
        this.setState({ isLoading: false, error: null })
      }
    }
  }


  render() {
    const title = "Jenis Anggota"
    const { memberData, currentPage, numberOfPages, from, to, numberOfEntries, isOpenDelete } = this.state
    const { pathname } = this.props.location
    return (

      <Main title={title}>
        <div className="head-tools">
          <div className="mr-md-auto align-self-stretch">
            <Tool onSearch={this.handleSearch}>
              <AddNewActionButton path={`${pathname}/create`} tooltipText={`Tambah ${title} Baru`} />
            </Tool>
          </div>

        </div>
        <PaginationLink
          rowFrom={from}
          rowTo={to}
          numberOfEntries={numberOfEntries}
          currentPage={currentPage}
          numberOfPages={numberOfPages}
          onPageChange={this.goToPage}
        />
        <SubMemberList
          data={memberData}
          pathname={pathname}
          toggle={this.toggleDelete}
          isOpen={isOpenDelete}
        />
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
      </Main>
    )
  }
}
