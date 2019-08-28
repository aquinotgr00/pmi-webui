import React from 'react'
import { Table } from 'reactstrap'
import moment from 'moment'

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
        {data && data.map((rsvp, key) => {
          const {created_at, deleted_at, title, village_id, village, admin_id, admin, volunteer} = rsvp
          const dateCreated = moment(created_at)
          const dateArchived = moment(deleted_at)
          return (
            <tr key={key}>
              <td>{key+1}</td>
              <td>
                {dateCreated.format('DD-MM-YYYY')}
                <br/>
                <small>{dateCreated.format('HH:mm')}</small>
              </td>
              <td>
                {dateArchived.format('DD-MM-YYYY')}
                <br/>
                <small>{dateArchived.format('HH:mm')}</small>
              </td>
              <td>{title}</td>
              <td>{village_id?village.subdistrict.city.name.toUpperCase():''}</td>
              <td>{admin_id?admin.name:volunteer.name}</td>
            </tr>
          )}
        )}
      </tbody>
    </Table>
  )
}