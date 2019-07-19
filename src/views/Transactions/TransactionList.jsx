import React, { Component } from 'react'
import { ExportButton, FilterDropdown, PaginationLink, Tool } from 'components'
import { Row, Col, Button, ButtonGroup, FormGroup, Input } from 'reactstrap'
import { listTransactionApi } from 'services/api'
import { TransactionTable } from './TransactionTable'

export default class TransactionList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchFor: '',
      rangesDate: null,
      statusFilter: null,
      title: null,
      startDate: null,
      endDate: null,
      goodItems: [],
      isLoading: false,
      data: [],
      error: null
    }

    this.loadTransaction = this.loadTransaction.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleSearchTitle = this.handleSearchTitle.bind(this)
    this.handleFilterStatus = this.handleFilterStatus.bind(this)

  }

  componentDidMount() {
    this.loadTransaction()
  }

  async loadTransaction(page = 1, searchFor = '', title = '', statusFilter = '') {
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

    if (title) {
      transactionParams.append('c', title)
    }

    if (statusFilter) {
      transactionParams.append('st', statusFilter)
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
    this.loadTransaction(this.state.page, searchKeyword, this.state.title, this.state.statusFilter)
  }

  handleSearchTitle(event) {
    const searchKeyword = event.target.value
    this.loadTransaction(this.state.page, this.state.searchFor, searchKeyword, this.state.statusFilter)
  }

  handleFilterStatus(event) {
    let filterStatus = event.target.value
    if (filterStatus == 0) {
      filterStatus = null;
    }
    this.loadTransaction(this.state.page, this.state.searchFor, this.state.title, filterStatus)

  }

  handleStartDate(){

    
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
        <TransactionTable data={transactionData} items={this.state.goodItems} transaction={transaction} />
      </>
    )
  }

  render() {
    const { transaction } = this.props
    const { error } = this.state
    console.log(transaction)
    return (
      <>
        <Row>
          <Col md="2">
            <FormGroup >
              <label >Rentang Waktu</label>
              <Input type="date" />
            </FormGroup>
          </Col>
          <Col md="2">
            <FormGroup >
              <label >Status</label>
              <Input type="select" onChange={this.handleFilterStatus}>
                <option value="0">Semua Status</option>
                <option value="1">Menunggu</option>
                <option value="2">Sukses</option>
                <option value="3">Dibatalkan</option>
              </Input>
            </FormGroup >
          </Col>
          <Col md="2">
            <FormGroup >
              <label >ID-Transaksi / Nama</label>
              <Input type="text" onChange={this.handleSearch} />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup >
              <label >Judul Donasi</label>
              <Input type="text" onChange={this.handleSearchTitle} />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup className="float-right">
              <div className="label-export">
                <label>Export Data</label>
              </div>
              <button className="circle-table btn-wrapper-reset btn-reset" data-toggle="tooltip" data-placement="top" title="" data-original-title="Reset" >
              </button>
              <ButtonGroup>
                <Button className="btn btn-line" >PDF</Button>
                <Button className="btn btn-line" >Excel</Button>
                <Button className="btn btn-line" >Print</Button>
              </ButtonGroup>
            </FormGroup>
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