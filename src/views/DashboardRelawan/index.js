import React, { Component } from 'react'
import { Main } from 'components'
import { VolunteerTable } from './VolunteerTable'
import { MembershipCard } from './MembershipCard'
import { listMembershipApi } from 'services/api'

export default class DashboardRelawan extends Component {

    constructor(props) {
        super(props)
        this.state = {
            volunteers: [],
            membership: [],
            collapse: false,
            shown: {}
        }
        this.loadMembership = this.loadMembership.bind(this)
        this.toggleCollapse = this.toggleCollapse.bind(this)
        
    }

    componentDidMount() {
        this.loadMembership()
    }

    toggleCollapse(panelNumber) {
        this.setState({
            shown: {
                ...this.state.shown,
                [panelNumber]: !this.state.shown[panelNumber]
            }
        })
        this.setState(state => ({ collapse: !state.collapse }))
    }

    async loadMembership() {
        try {
            const memberParams = new URLSearchParams()
            memberParams.append('l', 0)
            const response = await listMembershipApi(memberParams)
            const { status } = response.data
            if (status === "success") {
                const { data: membership } = response.data
                this.setState({ membership })
            }

        } catch (error) { }
    }

    render() {
        const title = 'Database Relawan PMI Provinsi DKI Jakarta'
        const { membership, collapse, shown } = this.state
        return (
            <Main title={title}>
                <MembershipCard
                    membership={membership}
                    collapse={collapse}
                    toggle={this.toggleCollapse}
                    shown={shown}
                />
                <VolunteerTable />
            </Main>
        )
    }
}