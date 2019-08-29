import React from 'react'
import { Table } from 'reactstrap'
import moment from 'moment'
import { EditActionButton, ArchiveActionButton } from 'components/ActionButtons';

export class Active extends React.Component {
  constructor(props) {
    super(props)
  
    this.handleArchive = this.handleArchive.bind(this)
  }
  
  handleArchive(rsvpId) {
    this.props.onArchive(rsvpId)
  }

  render() {
    const { data } = this.props
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
            const dateCreated = moment(created_at)
            
            return (
              <tr key={key}>
                <td>{key+1}</td>
                <td>
                  {dateCreated.format('DD-MM-YYYY')}
                  <br/>
                  <small>{dateCreated.format('HH:mm')}</small>
                </td>
                <td>{title}</td>
                <td>{village_id?village.subdistrict.city.name.toUpperCase():''}</td>
                <td>{participants_count}</td>
                <td>
                  <EditActionButton path={`${id}/edit`} />
                  <ArchiveActionButton onClick={this.handleArchive} id={id} />
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    )
  }
  
}
