import React from 'react'

export function PageCounter (props) {
  return (
    <ul className='pagination hidden-xs float-right'>
      <li className='page-item'>
        <button className='page-link' aria-label='Previous' onClick={() => {
          if (props.currentPage > 1) {
            props.onChange(props.currentPage - 1)
          }
        }}>
          <span aria-hidden='true'>«</span>
          <span className='sr-only'>Previous</span>
        </button>
      </li>
      <li className='page-item'><button className='page-link' href='#'>{props.currentPage}</button></li>
      <li className='page-item'>
        <button className='page-link' aria-label='Next' onClick={() => {
          if (props.currentPage < props.numberOfPages) {
            props.onChange(props.currentPage + 1)
          }
        }}>
          <span aria-hidden='true'>»</span>
          <span className='sr-only'>Next</span>
        </button>
      </li>
      <li className='page-item'>of {props.numberOfPages}</li>
    </ul>
  )
}
