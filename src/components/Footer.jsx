import React from 'react'
import { Col } from 'reactstrap'

export function Footer (props) {
  return (
    <footer className='mb-3 footer'>
      <div className='col-2' />
      <Col xs='2' />
      <div className='col-md-9 ml-sm-auto col-lg-10 pt-4'>
        <hr />
        <p>Powered by Nassau 2019. All right reserved</p>
      </div>
    </footer>
  )
}
