import React from 'react'
import { Row } from 'reactstrap'
import { PageCounter } from 'components'

export function PaginationLink (props) {
  return (
    <Row>
      <div className='col col-xs-4 pgntn'>Showing {props.rowFrom} to {props.rowTo} of {props.numberOfEntries} entries</div>
      <div className='col col-xs-8 pgntn'>
        <PageCounter
          currentPage={props.currentPage}
          numberOfPages={props.numberOfPages}
          onChange={props.onPageChange}
        />
      </div>
    </Row>
  )
}
