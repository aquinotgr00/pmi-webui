import React, { Component } from 'react'
import { ExportButton, FilterDropdown, PaginationLink, Tool } from 'components'
import { AddNewActionButton } from 'components/ActionButtons'
import { BulanDana } from './BulanDana'
import { DonasiDana } from './DonasiDana'
import { DonasiBarang } from './DonasiBarang'
import { Row, Col, FormGroup, Input } from 'reactstrap'
import { listTransactionApi } from 'services/api';

export default class TransactionList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchFor: '',
      filterItems: [
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
      exportItems: [
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
      goodItems: [],
      isLoading: false,
      data: [],
      error: null
    }

    this.loadTransaction = this.loadTransaction.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  componentDidMount() {
    this.loadTransaction()
  }

  async loadTransaction(page = 1, searchFor = '') {
    const transactionParams = new URLSearchParams()
    const { transaction } = this.props
    switch (transaction) {
      case 'bulan-dana':
        transactionParams.append('t', 3)
        break
      case 'donasi-dana':
        transactionParams.append('f', 1)
        break;
      default:
        transactionParams.append('f', 0)
    }

    transactionParams.append('page', page)

    if (searchFor) {
      transactionParams.append('n', searchFor)
    }

    this.setState({ isLoading: true, error: null })

    const response = await listTransactionApi(transactionParams)
    const { status } = response.data
    if (status === 'success') {
      const { data } = response.data
      const { current_page: currentPage, last_page: numberOfPages, data: transactionData, from, to, total: numberOfEntries } = data
      this.setState({ isLoading: false, transactionData, currentPage, numberOfPages, from, to, numberOfEntries, searchFor })
    } else {
      this.setState({ isLoading: false, error: null })
    }
  }

  handleSearch(event) {
    const searchKeyword = event.target.value
    this.loadTransaction(this.state.page, searchKeyword)
  }

  goToPage(page) {
    this.loadTransaction(page, this.state.searchFor)
  }

  renderTransactionList(transaction) {
    const { transactionData, currentPage, numberOfPages, from, to, numberOfEntries } = this.state
    return (
      <>
        <PaginationLink
          rowFrom={from}
          rowTo={to}
          numberOfEntries={numberOfEntries}
          currentPage={currentPage}
          numberOfPages={numberOfPages}
          onPageChange={this.goToPage}
        />
        {(transaction === 'bulan-dana') && <BulanDana />}
        {(transaction === 'donasi-dana') && <DonasiDana />}
        {(transaction === 'donasi-barang') && <DonasiBarang data={transactionData} items={this.state.goodItems} />}
      </>
    )
  }

  render() {
    const { transaction, title } = this.props
    const { error } = this.state
    return (
      <>
        <Row>
          <Col md="4">
            <Tool onSearch={this.handleSearch}>
              <FilterDropdown items={this.state.filterItems} />
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
            <ExportButton items={this.state.exportItems} />
          </Col>
        </Row>
        {error
          ? <div>Error</div>
          : this.renderTransactionList(transaction)
        }
      </>
    )
  }
}
