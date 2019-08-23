import React, { Component } from 'react'
import { Main, PaginationLink } from 'components'
import { Card, CardHeader, CardBody } from 'reactstrap'
import {
    listMembershipApi,
    getVolunteerList,
    getVolunteerApi,
    getAmountVolunteerApi
} from 'services/api'

import { VolunteerTable } from './VolunteerTable'
import { MembershipCard } from './MembershipCard'

export default class DashboardVolunteer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            volunteers: [],
            membership: [],
            subMembership: [],
            collapse: false,
            shown: {},
            panelNumber: null,
            membershipName: ''
        }
        this.loadAmountVolunteer = this.loadAmountVolunteer.bind(this)
        this.toggleCollapse = this.toggleCollapse.bind(this)
        this.loadVolunteer = this.loadVolunteer.bind(this)
        this.goToPage = this.goToPage.bind(this)
    }

    componentDidMount() {
        this.loadVolunteer()
        this.loadAmountVolunteer()
    }

    toggleCollapse(panelNumber) {
        
        this.setState({
            shown: {
                ...this.state.shown,
                [panelNumber]: !this.state.shown[panelNumber]
            }
        })
        this.setState({ panelNumber })
        this.setState(state => ({ collapse: !state.collapse }))
        const { membership } = this.state
        let member = membership.filter(member => {
            return member.id === parseInt(panelNumber)
        })
        const { subMember: subMembership, title: membershipName } = member[0]
        this.setState({ subMembership, membershipName })
    }

    goToPage(page) {
        this.loadVolunteer(page)
    }

    async loadAmountVolunteer() {
        try {
            const response = await getAmountVolunteerApi()
            const { status } = response.data
            if (status === "success") {
                const { data: membership } = response.data
                this.setState({ membership })
            }
        } catch (error) { }
    }

    async loadVolunteer(page = 1) {
        try {
            const volunteerParams = new URLSearchParams()
            volunteerParams.append('page', page)
            const response = await getVolunteerList(volunteerParams)
            const { status } = response.data
            if (status === "success") {
                const { admins: data } = response.data.data
                const { current_page: currentPage, last_page: numberOfPages, data: volunteers, from, to, total: numberOfEntries } = data
                this.setState({ isLoading: false, volunteers, currentPage, numberOfPages, from, to, numberOfEntries })
            }
        } catch (error) { }
    }

    render() {
        const title = 'Database Relawan PMI Provinsi DKI Jakarta'
        const {
            membership,
            membershipName,
            subMembership,
            collapse,
            shown,
            panelNumber,
            volunteers,
            currentPage,
            numberOfPages,
            from,
            to,
            numberOfEntries
        } = this.state

        return (
            <Main title={title}>
                <MembershipCard
                    membership={membership}
                    collapse={collapse}
                    toggle={this.toggleCollapse}
                    shown={shown}
                    panelNumber={panelNumber}
                    subMembership={subMembership}
                    membershipName={membershipName}
                />
                <Card>
                    <CardHeader className="header-top">
                        <p className="pl-0">Semua Relawan</p>
                    </CardHeader>
                    <CardBody>
                        <PaginationLink
                            rowFrom={from}
                            rowTo={to}
                            numberOfEntries={numberOfEntries}
                            currentPage={currentPage}
                            numberOfPages={numberOfPages}
                            onPageChange={this.goToPage}
                        />
                    </CardBody>
                    <VolunteerTable data={volunteers} />
                </Card>

            </Main>
        )
    }
}