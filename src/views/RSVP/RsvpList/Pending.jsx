import React from 'react'
import { Table } from 'reactstrap'
import { DateTime } from 'components/DateTime'
import { ApproveActionButton, RejectActionButton } from 'components/ActionButtons'

export function Pending (props) {
  const { data } = props
  return (
    <Table responsive hover>
      <thead>
        <tr>
          <th scope='col'>No</th>
          <th scope='col'>Tanggal Lapor</th>
          <th scope='col'>Judul</th>
          <th scope='col'>Lokasi</th>
          <th scope='col'>Nama Pelapor</th>
          <th scope='col'>Aksi</th>
        </tr>
      </thead>
      <tbody>
        {data && data.map((rsvp, key) => {
          const {created_at, title, village_id, village, admin_id, admin, volunteer} = rsvp
          return (
            <tr key={key}>
              <td>{key+1}</td>
              <td><DateTime data={created_at} /></td>
              <td>{title}</td>
              <td>{village_id?village.subdistrict.city.name.toUpperCase():''}</td>
              <td>{admin_id?admin.name:volunteer.name}</td>
              <td>
                <ApproveActionButton />
                <RejectActionButton />
              </td>
            </tr>
          )}
        )}
      </tbody>
    </Table>
  )
}
