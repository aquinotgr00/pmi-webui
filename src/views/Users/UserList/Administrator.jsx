import React from 'react'
import { Table } from 'reactstrap'
import { DeleteActionButton } from 'components/ActionButtons/DeleteActionButton'
import { EditActionButton } from 'components/ActionButtons/EditActionButton'

export function Administrator (props) {
  const headings = ['Nama','Email','Posisi','Aksi']
  const { data, path } = props
  return (
    <Table hover>
    <thead>
    <tr>
    {headings.map((head,key) => <th key={key}>{head}</th>)}
    </tr>
    </thead>
    <tbody>
    {data && data.map((user, key) => (
      <tr key={key}>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.role_id}</td>
      <td>
      <EditActionButton
      path={`${path}/${user.id}/edit`}
      data={user}
      />
      <DeleteActionButton path={`${path}/${user.id}/delete`}/>
      </td>
      </tr>
      ))}
    </tbody>
    </Table>
    )
}
