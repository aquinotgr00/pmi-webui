import React from 'react'
import { Main, Tool, PaginationLink, ListTable } from 'components'
import { getDonatorList } from 'services/api'

class Donators extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      donators: []
    }

    this.loadDonatorList = this.loadDonationList.bind(this)
  }

  componentDidMount () {
    this.loadDonationList()
  }

  async loadDonationList () {
    const donatorList = await getDonatorList()
    const { data } = donatorList.data
    console.log(data)
    this.setState({donators:data})
  }

  render () {
    return (
      <Main title='Donators'>
        <Tool />
        <PaginationLink />
        <ListTable donators={this.state.donators} />
      </Main>
    )
  }
}

export default Donators
