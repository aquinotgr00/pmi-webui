import React from "react"
import { EditActionButton } from "components"
import { Table, Button } from "reactstrap"

export function MemberList(props) {
  const { data, pathname, toggle } = props
  return (
    <Table hover>
      <thead>
        <tr>
          <th>No</th>
          <th>Kode</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map((member, key) => (
            <tr key={key}>
              <td>{key + 1}</td>
              <td>{member.code}</td>
              <td>{member.name}</td>
              <td>
                <EditActionButton path={`${pathname}/${member.id}/edit`} />
                <Button
                  onClick={toggle}
                  className='btn btn-table circle-table delete-table'
                  title='Hapus'
                />
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  )
}
