import React, { Component } from 'react'
import Faker from 'faker'
import { Main } from 'components'
import CampaignForm from './CampaignForm'
import ucwords from 'utils/string'

import 'react-datepicker/dist/react-datepicker.css'

export default class CampaignEditor extends Component {
  constructor (props) {
    super(props)
    this.state = {
      campaign: {}
    }
    this.loadCampaign = this.loadCampaign.bind(this)
  }

  componentDidMount () {
    const { campaign, campaignId } = this.props.match.params
    console.log(campaign)
    if (campaignId) {
      this.loadCampaign(campaignId)
    } else {
      if (process.env.NODE_ENV === 'development') {
        this.setState({ campaign: {
          title: Faker.lorem.sentences(),
          description: Faker.lorem.paragraphs(),
          amount_goal: Faker.random.number({ min: 10000000, max: 200000000 })
        } })
      }
    }
  }

  loadCampaign (campaignId) {

  }

  render () {
    const { campaign, campaignId } = this.props.match.params
    const campaignCategory = ucwords(campaign.split('-').join(' '))
    const title = campaignId ? `Edit ${campaignCategory}` : `Tambah ${campaignCategory} Baru`

    return (
      <Main title={title}>
        <div className='row pl-3'>
          {this.state.campaign
            ? <CampaignForm />
            : null}
        </div>
      </Main>
    )
  }
}
