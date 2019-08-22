import React, { Component } from 'react'

import { AddNewActionButton, PaginationLink, Tool } from 'components'
import { Active } from './Active'
import { Pending } from './Pending'
import { Archived } from './Archived'

import moment from 'moment'

export default class RsvpList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchFor: '',
      isLoading: false,
      data: [],
      error: null,
    }

    this.loadRsvp = this.loadRsvp.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.toggleTooltip = this.toggleTooltip.bind(this)
    this.renderRsvpList = this.renderRsvpList.bind(this)
    this.goToPage = this.goToPage.bind(this)
  }

  componentDidMount () {
    // this.loadRsvp()
  }

  async loadRsvp (page = 1, searchFor = '') {
    const rsvpListParams = new URLSearchParams()
    const { category } = this.props
    switch (category) {
      case 'archived':
        rsvpListParams.append('ar', 1)
        break
      case 'pending':
        rsvpListParams.append('p', 1)
        break
      default:
        rsvpListParams.append('ap', 1)
    }

    rsvpListParams.append('page', page)

    if (searchFor) {
      rsvpListParams.append('s', searchFor)
    }

    this.setState({ isLoading: true, error: null })

    /* try {
      const response = await listRsvpApi(rsvpListParams)
      const { status } = response.data
      if (status === 'success') {
        const { data } = response.data
        const { current_page: currentPage, last_page: numberOfPages, data: campaignData, from, to, total: numberOfEntries } = data
        this.setState({ isLoading: false, campaignData, currentPage, numberOfPages, from, to, numberOfEntries, filters, campaignType, searchFor })
      } else {
        // TODO : handle error
        this.setState({ isLoading: false, error: null })
      }
    } catch (error) {
      // TODO : handle error
    } */
  }

  handleSearch (event) {
    const searchKeyword = event.target.value
    //this.loadCampaign(this.state.page, this.state.filters, this.state.campaignType, searchKeyword)
  }

  goToPage (page) {
    //this.loadCampaign(page, this.state.filters, this.state.campaignType, this.state.searchFor)
  }

  toggleTooltip () {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    })
  }

  renderRsvpList (category) {
    const { data, currentPage, numberOfPages, from, to, numberOfEntries } = this.state

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
        {(category === 'list-rsvp') && <Active />}
        {(category === 'moderasi') && <Pending />}
        {(category === 'arsip') && <Archived />}
      </>
    )
  }

  render () {
    const { category } = this.props
    const { error } = this.state
    return (
      <>
        <Tool onSearch={this.handleSearch}>
          <AddNewActionButton path='buat-rsvp' />
        </Tool>
        {error
          ? <div>Error</div>
          : this.renderRsvpList(category)
        }
      </>
    )
  }
}
