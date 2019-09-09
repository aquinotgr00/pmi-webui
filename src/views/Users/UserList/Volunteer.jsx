import React from 'react'
import { Table, Button } from 'reactstrap'
import { VolunteerProfileModal } from 'components'
import { EditActionButton } from 'components/ActionButtons/EditActionButton'

export function Volunteer (props) {
  const { path } = props
  return (
    <Table hover>
      <thead>
        <tr>
          <th>No</th>
          <th>Nama</th>
          <th>Jenis Kelamin</th>
          <th>Jenis Anggota</th>
          <th>Kabupaten/Kota</th>
          <th>Unit</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((volunteer, key) => {
            key++
            const { unit } = volunteer
            const { membership } = unit
            return (
                <tr key={key}>
                    <td>{key}</td>
                    <td>
                        <VolunteerProfileModal
                            title={volunteer.name}
                            data={volunteer}
                            isOpen={props.isOpen}
                            toggle={props.toggleProfileModal}
                            handleExportPdf={props.handleExportPdf}
                        />
                    </td>
                    <td>{volunteer.gender}</td>
                    <td>{(membership)? membership.name : '' }</td>
                    <td>{volunteer.city}</td>
                    <td>{(unit)? unit.name : '' }</td>
                    <td>
                        <EditActionButton
                          path={`${path}/${volunteer.id}/edit`}
                          data={volunteer}
                        />
                        <Button
                            className='btn btn-table circle-table delete-table'
                            title='Delete'
                        />
                    </td>
                </tr>
            )
        })}
      </tbody>
    </Table>
  )
}
