import React from 'react'
import Header from './Header'

export function Main(props) {
  return (
    <>
      <Header title={props.title} />
      
      {props.children}
    </>
  ) 
}