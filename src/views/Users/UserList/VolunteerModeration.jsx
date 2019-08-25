import React from 'react'
import { Table, Button } from 'reactstrap'
import { VolunteerProfileModal, RejectModal } from 'components'

export function VolunteerModeration (props) {
  return (
    <Table hover>
      <thead>
        <tr>
          <th>No</th>
          <th>Nama</th>
          <th>Jenis Kelamin</th>
          <th>Jenis Anggota</th>
          <th>Sub Jenis Anggota</th>
          <th>Kabupaten/Kota</th>
          <th>Unit</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((volunteer, key) => {
            key++
            return (
                <tr key={key}>
                    <td>{key}</td>
                    <td><VolunteerProfileModal title={volunteer.name} data={volunteer} isOpen={props.isOpen} toggle={props.toggleProfileModal} /></td>
                    <td>{volunteer.gender}</td>
                    <td>{volunteer.unit === null ? '':volunteer.unit.membership.parent_member.name}</td>
                    <td>{volunteer.unit === null ? '':volunteer.unit.membership.name}</td>
                    <td>{volunteer.city}</td>
                    <td>{volunteer.unit === null ? '':volunteer.unit.name}</td>
                    <td>
                      <Button className='btn btn-table circle-table setuju-table' onClick={() => props.handleApprove(volunteer.id, {status:1}, key)} />
                      <span data-toggle="modal" role="button" data-target="#modaltolak">
                        <RejectModal handleApprove={props.handleApprove} key={key} volunteerId={volunteer.id} isOpen={props.rejectModalOpen} toggle={props.toggleProfileModal} />
                      </span>
                    </td>
                </tr>
            )
        })}
      </tbody>
    </Table>
  )
}