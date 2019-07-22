import React from 'react'
import { Route } from 'react-router-dom'
import { Main } from 'components'
import ucwords from 'utils/string'
import CampaignList from './CampaignList'

export default function Campaigns (props) {
  const { campaign } = props.match.params
  const title = ucwords(campaign.split('-').join(' '))
  return (
    <Main title={title}>
      {['bulan-dana', 'donasi-dana', 'donasi-barang'].map(function (c, key) {
        return (
          <Route
            path={`/admin/campaigns/${c}`}
            render={(props) => <CampaignList {...props} campaign={campaign} title={title} />}
            key={key}
          />
        )
      })}
    </Main>
  )
}
