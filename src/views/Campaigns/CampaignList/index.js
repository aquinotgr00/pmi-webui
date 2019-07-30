import React, { Component } from 'react'

import { AddNewActionButton, PaginationLink, Tool, CampaignDurationModal } from 'components'
import { CampaignFilterDropdown, CampaignTypeDropdown } from './Dropdowns'
import { BulanDana } from './BulanDana'
import { DonasiDana } from './DonasiDana'
import { DonasiBarang } from './DonasiBarang'
import { listCampaignApi, toggleCampaignApi, getCampaignApi, updateFinishCampaignApi } from 'services/api'

import moment from 'moment'

export default class CampaignList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchFor: '',
      filters: {},
      campaignType: null,
      tooltipOpen: false,
      isLoading: false,
      data: [],
      error: null,
      durationOpen: false,
      initialCampaign: []
    }

    this.loadCampaign = this.loadCampaign.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.toggleTooltip = this.toggleTooltip.bind(this)
    this.renderCampaignList = this.renderCampaignList.bind(this)
    this.goToPage = this.goToPage.bind(this)
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.handleCampaignTypeChange = this.handleCampaignTypeChange.bind(this)
    this.handleToggleAttribute = this.handleToggleAttribute.bind(this)
    this.handleToggleDuration = this.handleToggleDuration.bind(this)
    this.handleSubmitFinishCampaign = this.handleSubmitFinishCampaign.bind(this)
  }

  componentDidMount() {
    this.loadCampaign()
  }

  async loadCampaign(page = 1, filters = {}, campaignType = null, searchFor = '') {
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

    for (const param in filters) {
      if (filters[param] !== null) {
        campaignParams.append(param, filters[param])
      }
    }

    if (campaignType !== null) {
      campaignParams.append('t', campaignType)
    }

    if (searchFor) {
      campaignParams.append('s', searchFor)
    }

    this.setState({ isLoading: true, error: null })

    try {
      const response = await listCampaignApi(campaignParams)
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
    }
  }

  handleSearch(event) {
    const searchKeyword = event.target.value
    this.loadCampaign(this.state.page, this.state.filters, this.state.campaignType, searchKeyword)
  }

  handleFilterChange(filters) {
    this.loadCampaign(this.state.page, { ...this.state.filters, ...filters }, this.state.campaignType, this.state.searchFor)
  }

  handleCampaignTypeChange(campaignType) {
    this.loadCampaign(this.state.page, this.state.filters, campaignType, this.state.searchFor)
  }

  goToPage(page) {
    this.loadCampaign(page, this.state.filters, this.state.campaignType, this.state.searchFor)
  }

  toggleTooltip() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    })
  }

  async handleToggleDuration(id) {
    const response = await getCampaignApi(id)
    const { status, data } = response.data
    if (status === "success") {

      let finish_date = (data.finish_campaign === null) ? new Date() : data.finish_campaign
      this.setState({
        initialCampaign: { ...data, finish_campaign: moment(finish_date).toDate() },
      })

      this.setState(prevState => ({
        durationOpen: !prevState.durationOpen
      }));
    }

  }


  async handleToggleAttribute(id, attribute) {
    this.setState({ isLoading: true, error: null })

    const response = await toggleCampaignApi(id, attribute)
    const { status } = response.data
    if (status === 'success') {
      const { data } = response.data
      this.setState({ isLoading: false, campaignData: this.state.campaignData.map(item => item.id === data.id ? data : item) })
    } else {
      this.setState({ isLoading: false, error: null })
    }
  }

  async handleSubmitFinishCampaign(id, attribute) {
    const response = await updateFinishCampaignApi(id, attribute)
    const { status } = response.data
    if (status === "success") {
      let btnClose = document.getElementById('btn-close-campaign')
      this.loadCampaign()
      btnClose.click()
    }
  }

  renderCampaignList(campaign) {
    const { campaignData, currentPage, numberOfPages, from, to, numberOfEntries, initialCampaign } = this.state
    const { pathname } = this.props.location

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
        {(campaign === 'bulan-dana') && <BulanDana data={campaignData} path={pathname} toggle={this.handleToggleAttribute} duration={this.handleToggleDuration} />}
        {(campaign === 'donasi-dana') && <DonasiDana data={campaignData} path={pathname} toggle={this.handleToggleAttribute} duration={this.handleToggleDuration} />}
        {(campaign === 'donasi-barang') && <DonasiBarang data={campaignData} path={pathname} toggle={this.handleToggleAttribute} duration={this.handleToggleDuration} />}

        <CampaignDurationModal
          durationOpen={this.state.durationOpen}
          handleToggleDuration={this.handleToggleDuration}
          initialCampaign={initialCampaign}
          onClick={this.handleToggleDuration}
          handleSubmitFinishCampaign={this.handleSubmitFinishCampaign}
           />

      </>
    )
  }

  render() {
    const { campaign, title } = this.props
    const { error } = this.state
    return (
      <>
        <Tool onSearch={this.handleSearch}>
          {(campaign !== 'bulan-dana') && <CampaignTypeDropdown onChange={this.handleCampaignTypeChange} campaignType={this.state.campaignType} />}
          <CampaignFilterDropdown
            onChange={this.handleFilterChange}
            filters={this.state.filters}
          />
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
