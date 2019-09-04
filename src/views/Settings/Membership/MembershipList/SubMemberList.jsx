import React from "react"
import { EditActionButton } from "components"
import { Table, Button } from "reactstrap"

export function SubMemberList(props) {
  const { data, pathname } = props
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
                  { member.name  }
                </td>
                <td>
                  <EditActionButton path={`${pathname}/${member.id}/edit`} />
                  <Button
                    onClick={() => props.toggle(member.id)}
                    className='btn btn-table circle-table delete-table'
                    title='Hapus'
                  />
                </td>
              </tr>
            )
          })}
      </tbody>
    </Table>
  )
}
