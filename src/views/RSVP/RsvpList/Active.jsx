import React from 'react'
import { Table } from 'reactstrap'

export function Active (props) {
  const { data, path } = props
  return (
    <Table responsive hover>
      <thead>
        <tr>
          <th scope='col'>No</th>
          <th scope='col'>Tanggal Buat</th>
          <th scope='col'>Judul</th>
          <th scope='col'>Lokasi</th>
          <th scope='col'>Jumlah Anggota</th>
          <th scope='col'>Aksi</th>
        </tr>
      </thead>
      <tbody>
        {data && data.map((rsvp, key) => (
          <tr key={key}>
            
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
