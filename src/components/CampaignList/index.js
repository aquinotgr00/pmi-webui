import React, { Component } from 'react'

import { CampaignStatusDropdown, PaginationLink, Tool } from 'components'
import { AddNewActionButton } from 'components/ActionButtons'
import { BulanDana } from './BulanDana'
import { DonasiDana } from './DonasiDana'
import { DonasiBarang } from './DonasiBarang'
import { listCampaignApi } from 'services/api'

export default class CampaignList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchFor: '',
      published: null,
      tooltipOpen: false,
      isLoading: false,
      data: [],
      error: null
    }

    this.loadCampaign = this.loadCampaign.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.toggleTooltip = this.toggleTooltip.bind(this)
    this.renderCampaignList = this.renderCampaignList.bind(this)
    this.goToPage = this.goToPage.bind(this)
    this.handleStatusChange = this.handleStatusChange.bind(this)
  }

  componentDidMount () {
    this.loadCampaign()
  }

  async loadCampaign (page = 1, published = null, searchFor = '') {
    const campaignParams = new URLSearchParams()
    const { campaign } = this.props
    switch (campaign) {
      case 'bulan-dana':
        campaignParams.append('t', 3)
        break
      case 'donasi-dana':
        campaignParams.append('f', 1)
        break
      default:
        campaignParams.append('f', 0)
    }

    campaignParams.append('page', page)
    if (published !== null) {
      campaignParams.append('p', published)
    }

    if (searchFor) {
      campaignParams.append('s', searchFor)
    }

    this.setState({ isLoading: true, error: null })

    const response = await listCampaignApi(campaignParams)
    const { status } = response.data
    if (status === 'success') {
      const { data } = response.data
      const { current_page: currentPage, last_page: numberOfPages, data: campaignData, from, to, total: numberOfEntries } = data
      this.setState({ isLoading: false, campaignData, currentPage, numberOfPages, from, to, numberOfEntries, published, searchFor })
    } else {
      this.setState({ isLoading: false, error: null })
    }
  }

  handleSearch (event) {
    const searchKeyword = event.target.value
    this.loadCampaign(this.state.page, this.state.published, searchKeyword)
  }

  handleStatusChange (published) {
    this.loadCampaign(this.state.page, published, this.state.searchFor)
  }

  goToPage (page) {
    this.loadCampaign(page, this.state.published, this.state.searchFor)
  }

  toggleTooltip () {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    })
  }

  renderCampaignList (campaign) {
    const { campaignData, currentPage, numberOfPages, from, to, numberOfEntries } = this.state
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
        { (campaign === 'bulan-dana') && <BulanDana data={campaignData} /> }
        { (campaign === 'donasi-dana') && <DonasiDana data={campaignData} /> }
        { (campaign === 'donasi-barang') && <DonasiBarang data={campaignData} /> }
      </>
    )
  }

  render () {
    const { campaign, title } = this.props
    const { error } = this.state
    return (
      <>
        <Tool onSearch={this.handleSearch}>
          <CampaignStatusDropdown onChange={this.handleStatusChange} published={this.state.published} />
          <AddNewActionButton path={`${campaign}/create`} tooltipText={`Tambah ${title} Baru`} />
        </Tool>
        {error
          ? <div>Error</div>
          : this.renderCampaignList(campaign)
        }
      </>
    )
  }
}
