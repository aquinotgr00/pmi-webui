import React from 'react'
import { Main, Tool, PaginationLink, ListTable } from 'components'

class Donators extends React.Component {
  render () {
    return (
      <Main title='Donators'>
        <Tool />
        <PaginationLink />
        <ListTable />
      </Main>
    )
  }
}

export default Donators
