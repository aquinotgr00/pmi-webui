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
            <th><img src={campaign.image} alt='' /></th>
            <td>{campaign.formatted_title}</td>
            <td>{campaign.get_type.name}</td>
            <td>{campaign.ranges_donation}</td>
            <td>{campaign.publish ? 'Terpublikasi' : 'Draft'}</td>
            <td>
              <Link
                to={`/admin/campaigns/donasi-barang/${campaign.id}/edit`}
                className='btn btn-table circle-table edit-table'
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
