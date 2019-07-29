import React, { Component } from 'react'
import { Table, Input } from 'reactstrap'
import { Link } from 'react-router-dom'

export class TransactionTable extends Component {

  constructor(props) {
    super(props)

  }

  render() {
    let check = document.getElementsByClassName('check')

    let headings = [
      'Tanggal Donasi',
      'ID-Transaksi',
      'Nama',
      'Judul Donasi',
      'Tipe Donasi',
      'Status'
    ]

    const { data, transaction } = this.props

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
                  <Input type="checkbox" value={item.id} className="check" />
                </td>
                <td>{item.created_at}</td>
                <td>
                  <Link to={`/admin/transactions/${transaction}/${item.id}`}>
                    {item.invoice_id}
                  </Link>
                </td>
                <td>
                  <Link to={`/admin/transactions/${transaction}/${item.id}`}>
                    {item.name}
                  </Link>
                </td>
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
}
