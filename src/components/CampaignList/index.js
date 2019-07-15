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
      tooltipOpen: false,
      isLoading: false,
      data: [],
      error: null
    }

    this.loadCampaign = this.loadCampaign.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.toggleTooltip = this.toggleTooltip.bind(this)
    this.renderCampaignList = this.renderCampaignList.bind(this)
  }

  componentDidMount () {
    this.loadCampaign()
  }

  async loadCampaign (campaign) {
    this.setState({ isLoading: true, error: null })
    const response = await listCampaignApi()
    const { status } = response.data
    if (status === 'success') {
      const { data } = response.data
      console.log(data)
      const { current_page: currentPage, last_page: numberOfPages, data: campaignData, from, to, total: numberOfEntries } = data
      this.setState({ isLoading: false, campaignData, currentPage, numberOfPages, from, to, numberOfEntries })
      console.log(this.state)
    } else {
      this.setState({ isLoading: false, error: null })
    }

    /*
    switch (campaign) {
      case 'bulan-dana':

        break
      default:
    }
    */
  }

  handleSearch () {

  }

  toggleTooltip () {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    })
  }

  renderCampaignList () {
    const { campaign } = this.props
    const { campaignData, currentPage, numberOfPages, from, to, numberOfEntries } = this.state
    return (
      <>
        <PaginationLink
          rowFrom={from}
          rowTo={to}
          numberOfEntries={numberOfEntries}
          currentPage={currentPage}
          numberOfPages={numberOfPages}
        />
        { (campaign === 'bulan-dana') && <BulanDana data={campaignData} /> }
        { (campaign === 'donasi-dana') && <DonasiDana /> }
        { (campaign === 'donasi-barang') && <DonasiBarang /> }
      </>
    )
  }

  render () {
    const { campaign, title } = this.props
    const { error } = this.state
    return (
      <>
        <Tool onSearch={this.handleSearch}>
          <CampaignStatusDropdown />
          <AddNewActionButton path={`${campaign}/create`} tooltipText={`Tambah ${title} Baru`} />
        </Tool>
        {error
          ? <div>Error</div>
          : this.renderCampaignList()
        }
      </>
    )
  }
}
