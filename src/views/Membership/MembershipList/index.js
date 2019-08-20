import React, { Component } from "react"
import { Main } from "components"
import { MemberList } from "./MemberList"
import { SubMemberList } from "./SubMemberList"
import { PaginationLink, AddNewActionButton, Tool } from 'components'
import { listMembershipApi, deleteMembershipApi } from 'services/api'
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
      isOpen: false,
      parents: []
    }
    this.loadMembers = this.loadMembers.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.goToPage = this.goToPage.bind(this)
    this.confirmDelete = this.confirmDelete.bind(this)
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

  handleReset(){
    let filterMember  = document.getElementById('filterMember')
    let searchBox     = document.getElementsByClassName('search-box')
    filterMember.value = 0
    searchBox.value = ""
    this.loadMembers();
  }

  toggleDelete() {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }))
  }

  async confirmDelete(memberId) {
    const { type } = this.props.match.params
    const response = await deleteMembershipApi(memberId)
    const { status } = response.data
    if (status === 'success') {
      this.toggleDelete()
      const { history } = this.props
      history.push(`/admin/membership/${type}`)
    }
  }

  async loadMembers(page = 1, searchFor = '', parentFilter = '') {
    const { type } = this.props.match.params

    const memberParams = new URLSearchParams()
    memberParams.append('page', page)

    if (searchFor) {
      memberParams.append('s', searchFor)
    }

    if (parentFilter) {
      memberParams.append('l', parentFilter)
    }

    if (type === 'sub-jenis-anggota') {
      memberParams.append('sub', 1)
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
    const { type } = this.props.match.params
    const title = ucwords(type.split("-").join(" "))
    const { memberData, currentPage, numberOfPages, from, to, numberOfEntries, isOpen, parents } = this.state
    const { pathname } = this.props.location
    return (

      <Main title={title}>

        {(type === "jenis-anggota" || type === "sub-jenis-anggota") &&
          <div className="head-tools">
            <div className="mr-md-auto align-self-stretch">
              <Tool onSearch={this.handleSearch}>
                <AddNewActionButton path={`${pathname}/create`} tooltipText={`Tambah ${title} Baru`} />
              </Tool>
            </div>
   
          </div>
        }

        {(type === "jenis-anggota" || type === "sub-jenis-anggota") &&
          <PaginationLink
            rowFrom={from}
            rowTo={to}
            numberOfEntries={numberOfEntries}
            currentPage={currentPage}
            numberOfPages={numberOfPages}
            onPageChange={this.goToPage}
          />
        }

        {type === "jenis-anggota" &&
          <MemberList
            data={memberData}
            pathname={pathname}
            toggle={this.toggleDelete}
            onAction={this.confirmDelete}
            isOpen={isOpen}
          />
        }
        {type === "sub-jenis-anggota" &&
          <SubMemberList
            data={memberData}
            pathname={pathname}
            toggle={this.toggleDelete}
            onAction={this.confirmDelete}
            isOpen={isOpen}
          />
        }
      </Main>
    )
  }
}
