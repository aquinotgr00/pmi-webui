import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'reactstrap'

export function DonasiBarang (props) {
  const { data } = props
  return (
    <Table hover>
      <thead>
        <tr>
          <th>Gambar</th>
          <th>Judul</th>
          <th>Tipe Donasi</th>
          <th>Rentang Waktu Donasi</th>
          <th>Status</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        {data && data.map((campaign, key) => (
          <tr key={key}>
            <td>{campaign.image}</td>
            <td>{campaign.title}</td>
            <td>{campaign.get_type.name}</td>
            <td>{campaign.ranges_donation}</td>
            <td>{campaign.publish ? 'Terpublikasi' : 'Draft'}</td>
            <td><Link to='/admin/campaigns/bulan-dana/1/edit'>edit</Link></td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
