import React from 'react'
import { Table, Input } from 'reactstrap'
import { Link } from 'react-router-dom'

export function TransactionTable(props) {
  
  let headings = [
    'Tanggal Donasi',
    'ID-Transaksi',
    'Nama',
    'Judul Donasi',
    'Tipe Donasi',
    'Status'
  ]
  const { data, transaction } = props
  
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
        {data && data.map((item, key) => {
          return (
            <tr key={key}>
              <td>
                <Input type="checkbox" id="{item.id}" />
              </td>
              <td>{item.created_at}</td>
              <td>
                <Link to={`/admin/transactions/${transaction}/${item.id}`}>
                {item.invoice_id}
                </Link>
              </td>
              <td>{item.name}</td>
              <td>{item.campaign.title}</td>
              <td>{item.campaign.get_type.name}</td>
              <td>{item.status_text}</td>
            </tr>
          )
        })}

      </tbody>
    </Table>
  )
}
