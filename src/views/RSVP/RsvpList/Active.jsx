import React from 'react'
import { Table } from 'reactstrap'
import { EditActionButton, ArchiveActionButton } from 'components/ActionButtons'
import { DateTime } from 'components/DateTime'

export function Active (props) {
  const { data } = props
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
        {data.map((rsvp, key) => {
          const {created_at, id, title, village_id, village, participants_count} = rsvp
          return (
            <tr key={key}>
              <td>{key+1}</td>
              <td><DateTime data={id===1?null:created_at} /></td>
              <td>{title}</td>
              <td>{village_id?village.subdistrict.city.name.toUpperCase():''}</td>
              <td>{participants_count}</td>
              <td>
                <EditActionButton path={`${id}/edit`} />
                {id!==1 && <ArchiveActionButton onClick={props.onArchive} id={id} />}
              </td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}