import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'reactstrap'
import ucwords from 'utils/string'

export function Donator (props) {
  const { path } = props
  return (
    <Table hover>
      <thead>
        <tr>
          <th>Nama</th>
          <th>E-mail</th>
          <th>No.Tlp</th>
          <th>Tanggal Daftar</th>
          <th>Waktu Donasi Terakhir</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((donator, key) => {
                return (
                  <tr key={key}>
                    <th>
                      <Link to={`${path}/${donator.id}/edit`}>{ ucwords(donator.name) }</Link>
                    </th>
                    <td>{ (donator.user === null) ? '' : donator.user.email }</td>
                    <td>{donator.phone}</td>
                    <td>{donator.created_at}</td>
                    <td>{donator.donations.length > 0 && donator.donations[0].created_at }</td>
                  </tr>
                )
              })}
      </tbody>
    </Table>
  )
}
