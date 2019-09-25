import React from 'react'
import { Table, Button } from 'reactstrap'
import { VolunteerProfileModal, RejectModal } from 'components'
import { genderTranslate } from 'utils/string'

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
            const { membership }  = volunteer.unit
            let memberType        = membership.name
            let subMemberType     = membership.name
            key++
            
            if(membership.parent_member) {
              memberType = membership.parent_member.name
            }
            return (
                <tr key={`${volunteer.id}`}>
                    <td>{key}</td>
                    <td><VolunteerProfileModal title={volunteer.name} data={volunteer} isOpen={props.isOpen} toggle={props.toggleProfileModal} /></td>
                    <td>{genderTranslate(volunteer.gender)}</td>
                    <td>{volunteer.unit === null ? '':memberType}</td>
                    <td>{memberType === subMemberType ? '':subMemberType}</td>
                    <td>{volunteer.city}</td>
                    <td>{volunteer.unit === null ? '':volunteer.unit.name}</td>
                    <td>
                      <Button className='btn btn-table circle-table setuju-table' onClick={() => props.handleApprove(volunteer.id, {verified:1}, key)} />
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