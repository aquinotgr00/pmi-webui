import React from 'react'
import { Table, Input } from 'reactstrap'

export function DonasiBarang(props) {

  let headings = [
    'Tanggal Donasi',
    'ID-Transaksi',
    'Nama',
    'Judul Donasi',
    'Tipe Donasi',
    'Status'
  ]

  let items = props.items

  return (
    <Table hover>
      <thead>
        <tr>
          <td>
            <Input type="checkbox" id="check-all" />
          </td>
          {headings.map((head, index) => <th key={index}>{head}</th>)}
        </tr>
      </thead>
      <tbody>
        {items.map((item, key) => {
          return (
            <tr key={key}>
              <td>
                <Input type="checkbox" id="{item.id}" />
              </td>
              <td>{item.created_at}</td>
              <td>{item.transaction_id}</td>
              <td>{item.name}</td>
              <td>{item.title}</td>
              <td>{item.status}</td>
            </tr>
          )
        })}

      </tbody>
    </Table>
  )
}
