import React from 'react'
import { Main, Tool, PaginationLink } from 'components'
import ucwords from 'utils/string'

class Campaigns extends React.Component {
  componentDidMount () {
    console.log('mounted')
  }

  render () {
    const { campaign } = this.props.match.params

    return (
      <Main title={ucwords(campaign.split('-').join(' '))}>
        <Tool />
        <PaginationLink />
      </Main>

    )
  }
}

export default Campaigns
