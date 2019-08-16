import React, { Component } from 'react'
import { Main, PaginationLink, AddNewActionButton, Tool, EditActionButton } from 'components'
import { Row, Col, Button, Table, Tooltip } from 'reactstrap'
import { listMembershipApi } from 'services/api'

export default class MembershipList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            searchFor: '',
            isLoading: false,
            memberData: [],
            error: null
        }
        this.goToPage = this.goToPage.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
    }

    componentDidMount() {
        this.loadMembership()
    }

    async loadMembership(page = 1, searchFor = '') {
        const memberParams = new URLSearchParams()
        memberParams.append('page', page)
        if (searchFor) {
            memberParams.append('s', searchFor)
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

    goToPage(page) {
        this.loadMembership(page, this.state.searchFor)
    }

    handleSearch(event) {
        const searchKeyword = event.target.value
        this.setState({ searchFor: searchKeyword })
        this.loadMembership(this.state.page, searchKeyword)
    }

    render() {
        const { memberData, currentPage, numberOfPages, from, to, numberOfEntries } = this.state
        const { pathname } = this.props.location

        return (
            <>
                <Main title="Jenis KeAnggotaan">
                    <Row>
                        <Col >
                            <Tool onSearch={this.handleSearch}>
                                <AddNewActionButton path="/admin/membership/create" />
                            </Tool>
                        </Col>
                    </Row>
                    <PaginationLink
                        rowFrom={from}
                        rowTo={to}
                        numberOfEntries={numberOfEntries}
                        currentPage={currentPage}
                        numberOfPages={numberOfPages}
                        onPageChange={this.goToPage} />
                    <Table hover>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Kode</th>
                                <th>Jenis Anggota</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {memberData && memberData.map((member, key) => (
                                <tr key={key}>
                                    <td>{key + 1}</td>
                                    <td>{member.code}</td>
                                    <td>{member.name}</td>
                                    <td>
                                        <EditActionButton
                                            path={`${pathname}/${member.id}/edit`}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Main>
            </>
        )
    }
}