import React from 'react'
import { Route } from 'react-router-dom'
import { Main } from 'components'
import AreaList from './AreaList'
import ucwords from 'utils/string'

export default function Areas (props) {
  const { area }  = props.match.params
  const title     = ucwords(area.split('-').join(' '))
  
  return (
    <Main title={title}>
      {['kabupaten-kota', 'kecamatan', 'kelurahan-desa'].map(function (c,index) {
        return (
          <Route
            key={index}
            path={`/admin/settings/${c}`}
            render={(props) => <AreaList {...props} title={area} />}
          />
        )
      })}
    </Main>
  )
}
