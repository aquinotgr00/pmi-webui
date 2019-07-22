import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'reactstrap'

export function Donator (props) {
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
        
      </tbody>
    </Table>
  )
}
