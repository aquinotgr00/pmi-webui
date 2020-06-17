import React from 'react'
import Header from './Header'
import { css } from '@emotion/core'
import { DotLoader } from 'react-spinners'

const spinnerWrapperStyle = {
  width:'100%',
  height:'100%',
  backgroundColor:'rgba(255,255,255,0.75)',
  position:'absolute',
  top:0,
  left:0,
  display:'flex',
  justifyContent:'center',
  alignItems:'center'
}

const loaderStyle = css`
  position:absolute;
  top:40vh;
  left:35vw;
`

export function Main (props) {
  return (
    <>
      <Header {...props} />
      <div style={{position:'relative'}}>
        {props.children}
        {props.isLoading && <div style={spinnerWrapperStyle} /> }
      </div>
      <DotLoader
        css={loaderStyle}
        sizeUnit='px'
        size={150}
        color='#ED1C24'
        loading={props.isLoading || false}
      />
    </>
  )
}
