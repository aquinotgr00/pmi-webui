import React, { Component } from 'react'
import { CampaignStatusDropdown, PaginationLink, Tool } from 'components'
import { AddNewActionButton } from 'components/ActionButtons'
import { BulanDana } from './BulanDana'
import { DonasiDana } from './DonasiDana'
import { DonasiBarang } from './DonasiBarang'

export default class CampaignList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchFor: ''
    }

    this.loadCampaign = this.loadCampaign.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  componentDidMount () {
    console.log(this.props.campaign)
  }

  loadCampaign (campaign) {
    switch (campaign) {
      case 'bulan-dana':

        break
      default:
    }
  }

  handleSearch () {

  }

  render () {
    const { campaign, title } = this.props
    return (
      <>
        <Tool onSearch={this.handleSearch}>
          <CampaignStatusDropdown />
          <AddNewActionButton path={`${campaign}/create`} tooltipText={`Tambah ${title} Baru`} />
        </Tool>

        <PaginationLink
          rowFrom={1}
          rowTo={5}
          numberOfEntries={24}
          currentPage={1}
          numberOfPages={5}
        />
        { (campaign === 'bulan-dana') && <BulanDana /> }
        { (campaign === 'donasi-dana') && <DonasiDana /> }
        { (campaign === 'donasi-barang') && <DonasiBarang /> }
      </>
    )
  }
}
