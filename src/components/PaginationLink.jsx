import React from 'react'
import { Row } from 'reactstrap'

export function PaginationLink (props) {
  return (
    <Row>
      <div className='col col-xs-4 pgntn'>Showing {props.rowFrom} to {props.rowTo} of {props.numberOfEntries} entries</div>
      <div className='col col-xs-8 pgntn'>
        <ul className='pagination hidden-xs float-right'>
          <li className='page-item'>
            <button className='page-link' aria-label='Previous'>
              <span aria-hidden='true'>«</span>
              <span className='sr-only'>Previous</span>
            </button>
          </li>
          <li className='page-item'><button className='page-link' href='#'>{props.currentPage}</button></li>
          <li className='page-item'>
            <button className='page-link' aria-label='Next'>
              <span aria-hidden='true'>»</span>
              <span className='sr-only'>Next</span>
            </button>
          </li>
          <li className='page-item'>of {props.numberOfPages}</li>
        </ul>
      </div>
    </Row>
  )
}
