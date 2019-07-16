import React, { Component } from 'react'

export default class CampaignForm extends Component {
  constructor (props) {
    super(props)

    this.loadCampaign = this.loadCampaign.bind(this)
  }

  componentDidMount () {
    const { campaignId } = this.props.match.params
    if (campaignId) {
      this.loadCampaign(campaignId)
    }
  }

  loadCampaign (campaignId) {

  }

  render () {
    return (
      <div>
        {this.props.match.params.campaignId ? 'edit' : 'add'} campaign
      </div>
    )
  }
}
