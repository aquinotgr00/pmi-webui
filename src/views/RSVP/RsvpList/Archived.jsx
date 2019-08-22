import React from 'react'
import { Table } from 'reactstrap'

export function Archived (props) {
  const { data } = props
  return (
    <Table responsive hover>
      <thead>
        <tr>
          <th scope='col'>No</th>
          <th scope='col'>Tanggal Lapor</th>
          <th scope='col'>Tanggal Pengarsipan</th>
          <th scope='col'>Judul</th>
          <th scope='col'>Lokasi</th>
          <th scope='col'>Nama Pelapor</th>
        </tr>
      </thead>
      <tbody>
        {data && data.map((campaign, key) => (
          <tr key={key}>
            
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
