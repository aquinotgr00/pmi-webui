import React from "react"
import { EditActionButton, ConfirmModal } from "components"
import { Table, Button } from "reactstrap"

export function SubMemberList(props) {
  const { data, pathname, toggle, isOpen } = props
  return (
    <Table hover>
      <thead>
        <tr>
          <th>No</th>          
          <th>Jenis Anggota</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map((member, key) => {
            return (
              <tr key={key}>
                <td>{key + 1}</td>
                <td>
                  { member.circular  }
                </td>
                <td>
                  <EditActionButton path={`${pathname}/${member.id}/edit`} />
                  <Button
                    onClick={toggle}
                    className='btn btn-table circle-table delete-table'
                    title='Hapus'
                  />
                  <ConfirmModal
                    isOpen={isOpen}
                    toggle={toggle}
                    onAction={() => props.onAction(member.id)}
                    labelTitle="Hapus Data"
                    labelContent="Anda yakin akan menghapus data ini?"
                    labelAction="Hapus"
                  />
                </td>
              </tr>
            )
          })}
      </tbody>
    </Table>
  )
}
