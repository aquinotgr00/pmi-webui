import React, { Component } from 'react'

import { AddNewActionButton, PaginationLink, Tool } from 'components'
import { Active } from './Active'
import { Pending } from './Pending'
import { Archived } from './Archived'
import { listRsvpApi } from 'services/api'
import moment from 'moment'

export default class RsvpList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchFor: '',
      isLoading: false,
      rsvpData: [],
      error: null,
      currentPage: 1,
      numberOfPages: 0,
      from: 0,
      to: 0,
      numberOfEntries: 0
    }

    this.loadRsvp = this.loadRsvp.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.toggleTooltip = this.toggleTooltip.bind(this)
    this.renderRsvpList = this.renderRsvpList.bind(this)
    this.goToPage = this.goToPage.bind(this)
  }

  componentDidMount () {
    this.loadRsvp()
  }

  async loadRsvp (page = 1, searchFor = '') {
    const rsvpListParams = new URLSearchParams()
    const { category } = this.props
    switch (category) {
      case 'arsip':
        rsvpListParams.append('ar', 1)
        break
      case 'moderasi':
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

    try {
      const response = await listRsvpApi(rsvpListParams)
      const { status } = response.data
      if (status === 'success') {
        const { data } = response.data
        const { current_page: currentPage, last_page: numberOfPages, data: rsvpData, from, to, total: numberOfEntries } = data
        this.setState({ isLoading: false, rsvpData, currentPage, numberOfPages, from, to, numberOfEntries, searchFor })
        
      } else {
        // TODO : handle error
        this.setState({ isLoading: false, error: null })
      }
    } catch (error) {
      // TODO : handle error
    }
  }

  handleSearch (event) {
    const searchKeyword = event.target.value
    this.loadRsvp(this.state.page, searchKeyword)
  }

  goToPage (page) {
    this.loadRsvp(page, this.state.searchFor)
  }

  toggleTooltip () {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    })
  }

  renderRsvpList (category) {
    const { rsvpData, currentPage, numberOfPages, from, to, numberOfEntries } = this.state

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
        {(category === 'list-rsvp') && <Active data={rsvpData} />}
        {(category === 'moderasi') && <Pending data={rsvpData} />}
        {(category === 'arsip') && <Archived data={rsvpData} />}
      </>
    )
  }

  render () {
    const { category } = this.props
    const { error } = this.state
    return (
      <>
        <Tool onSearch={this.handleSearch}>
          {category === 'list-rsvp' && <AddNewActionButton path='buat-rsvp' /> }
        </Tool>
        {error
          ? <div>Error</div>
          : this.renderRsvpList(category)
        }
      </>
    )
  }
}
