import React from 'react'

export function ImagePickerPreview(props) {
  return (
    <div 
      className='img-thumbnail' 
      style={
        {
          padding:'.25rem', 
          width:'320px', 
          height:'240px', 
          backgroundImage:`url(${props.url})`, 
          backgroundSize:'contain', 
          backgroundRepeat:'no-repeat', 
          backgroundPosition:'center'
        }
      }
    />
  )
}
