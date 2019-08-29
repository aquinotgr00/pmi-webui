import React from 'react'
import moment from 'moment'

export function DateTime (props) {
  const dateTime = moment(props.data)
  return (
    <>
    {dateTime.isValid()?
      <>
        {dateTime.format('DD-MM-YYYY')}
        <br/>
        <small>{dateTime.format('HH:mm')}</small>
      </>
      :'-'
    }
    </>
  )
}