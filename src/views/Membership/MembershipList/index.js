import React, { Component } from "react"
import { Main } from "components"
import { MemberList } from "./MemberList"
import { SubMemberList } from "./SubMemberList"
import { PaginationLink, AddNewActionButton, Tool } from 'components'
import { listMembershipApi, deleteMembershipApi, listParentMembershipApi } from 'services/api'
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
    this.loadParentMembers = this.loadParentMembers.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.goToPage = this.goToPage.bind(this)
    this.confirmDelete = this.confirmDelete.bind(this)
    this.toggleDelete = this.toggleDelete.bind(this)
    this.handleOnChangeParent = this.handleOnChangeParent.bind(this)
  }

  componentDidMount() {
    this.loadMembers()
    this.loadParentMembers()
  }

  async loadParentMembers() {
    try {
      const response = await listParentMembershipApi()
      const { status } = response.data
      if (status === "success") {
        const { data: parents } = response.data
        this.setState({ parents })
      } else {
        // TODO : handle error
        this.setState({ isLoading: false, error: null })
      }

    } catch (error) {
      // TODO : handle error
    }
  }

  goToPage(page) {
    this.loadMembers(page, this.state.searchFor, this.state.parentFilter)
  }

  handleOnChangeParent(event){
    const parentFilter = event.target.value
    this.setState({ parentFilter })
    this.loadMembers(this.state.page, this.state.searchFor, parentFilter)
  }

  handleSearch(event) {
    const searchKeyword = event.target.value
    this.setState({ searchFor: searchKeyword })
    this.loadMembers(this.state.page, searchKeyword, this.state.parentFilter)
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
      memberParams.append('p_id', parentFilter)
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
          <div className="ml-md-auto align-self-stretch">
            <form className="form-inline my-3">
              <h2 className="my-auto">Filter:</h2>
            <div className="form-group ml-3">
              <select className="form-control" onChange={this.handleOnChangeParent}>
                  <option value="0">Pilih Jenis Anggota</option>
                  {parents.map((parent,key) => {
                    return (
                      <option key={key} value={parent.id}>{parent.name}</option>
                    )
                  })}
              </select>
            </div>
            <button className="btn circle-table btn-reset" data-toggle="tooltip" data-placement="top" title="" data-original-title="Reset"></button>
            </form>
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
