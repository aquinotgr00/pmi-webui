import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'reactstrap'

export function Administrator (props) {
  return (
    <Table hover>
      <thead>
        <tr>
          <th>Gambar</th>
          <th>Judul</th>
          <th>Rentang Waktu Donasi</th>
          <th>Donasi Terkumpul</th>
          <th>Target Donasi</th>
          <th>Status</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td><Link to='/admin/users/admin/3/edit'>@mdo</Link></td>
        </tr>
      </tbody>
    </Table>
  )
}
