import React from 'react'
import { Table, Button } from 'reactstrap'
import { VolunteerProfileModal } from 'components'
import { EditActionButton } from 'components/ActionButtons/EditActionButton'
import { genderTranslate } from 'utils/string'

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
            const { id, name, unit, gender, city } = volunteer
            const { membership } = unit
            return (
                <tr key={`${id}`}>
                    <td>{key+1}</td>
                    <td>
                        <VolunteerProfileModal
                            title={name}
                            data={volunteer}
                            isOpen={props.isOpen}
                            toggle={props.toggleProfileModal}
                            handleExportPdf={props.handleExportPdf}
                        />
                    </td>
                    <td>{genderTranslate(gender)}</td>
                    <td>{(membership)? membership.name : '' }</td>
                    <td>{city}</td>
                    <td>{(unit)? unit.name : '' }</td>
                    <td>
                        <EditActionButton
                          path={`${path}/${id}/edit`}
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
