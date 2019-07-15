import React, { Component } from 'react'
import { ExportButton, FilterDropdown, PaginationLink, Tool } from 'components'
import { AddNewActionButton } from 'components/ActionButtons'
import { BulanDana } from './BulanDana'
import { DonasiDana } from './DonasiDana'
import { DonasiBarang } from './DonasiBarang'
import { Row, Col, FormGroup, Input } from 'reactstrap'

export default class TransactionList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchFor: '',
      filter_items: [
        {
          id: 1,
          text: 'Menunggu'
        },
        {
          id: 2,
          text: 'Sukses'
        },
        {
          id: 3,
          text: 'Dibatalkan'
        }
      ],
      export_items: [
        {
          text: 'PDF'
        },
        {
          text: 'Excel'
        },
        {
          text: 'Print'
        }
      ],
      barang_items: []
    }

    this.loadTransaction = this.loadTransaction.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  componentDidMount() {
    console.log(this.props.transaction)
  }

  loadTransaction(transaction) {
    switch (transaction) {
      case 'bulan-dana':
        const params = new URLSearchParams()
        break
      default:
    }
  }

  handleSearch() {

  }

  render() {
    const { transaction, title } = this.props
    return (
      <>
        <Row>
          <Col md="4">
            <Tool onSearch={this.handleSearch}>
              <FilterDropdown items={this.state.filter_items} />
              <AddNewActionButton path={`${transaction}/create`} tooltipText={`Tambah ${title} Baru`} />
            </Tool>
          </Col>
          <Col md="2">
            <FormGroup>
              <label>No Invoice/Nama Donatur</label>
              <Input type="text" />
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
              <label>Judul Donasi</label>
              <Input type="text" />
            </FormGroup>
          </Col>
          <Col md="2">
            <ExportButton items={this.state.export_items} />
          </Col>
        </Row>
        <PaginationLink
          rowFrom={1}
          rowTo={5}
          numberOfEntries={24}
          currentPage={1}
          numberOfPages={5}
        />
        {(transaction === 'bulan-dana') && <BulanDana />}
        {(transaction === 'donasi-dana') && <DonasiDana />}
        {(transaction === 'donasi-barang') && <DonasiBarang items={this.state.barang_items} />}
      </>
    )
  }
}
