import React, { Component } from 'react'
import { Row } from 'reactstrap'

export class PaginationLink extends Component {
  render () {
    return (
      <Row>
        <div className='col col-xs-4 pgntn'>Showing 1 to 5 of 24 enteries</div>
        <div className='col col-xs-8 pgntn'>
          <ul className='pagination hidden-xs float-right'>
            <li className='page-item'>
              <a className='page-link' href='#' aria-label='Previous'>
                <span aria-hidden='true'>«</span>
                <span className='sr-only'>Previous</span>
              </a>
            </li>
            <li className='page-item'><a className='page-link' href='#'>1</a></li>
            <li className='page-item'>
              <a className='page-link' href='#' aria-label='Next'>
                <span aria-hidden='true'>»</span>
                <span className='sr-only'>Next</span>
              </a>
            </li>
            <li className='page-item'>of 3</li>
          </ul>
        </div>
      </Row>
    )
  }
}
