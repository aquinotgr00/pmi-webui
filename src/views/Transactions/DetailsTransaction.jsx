import React, { Component } from 'react'
import { Main, InformationCard } from 'components'
import { Row, Col, Card, CardBody, CardTitle, Modal, ModalBody, ModalFooter, Button } from 'reactstrap'
import { showTransaction } from 'services/api'
import { FundraisingTable } from './FundraisingTable'
import { NonFundraisingTable } from './NonFundraisingTable'
import { updateTransaction, updateInfoTransaction } from 'services/api'

export default class DetailsTransaction extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: [],
      isOpen: false,
    }
    this.toggleImage = this.toggleImage.bind(this)
    this.handleSubmitDetails = this.handleSubmitDetails.bind(this)
    this.handleSubmitInfo = this.handleSubmitInfo.bind(this)
  }

  componentDidMount() {
    const { transactionId } = this.props.match.params
    this.loadDetailsTransaction(transactionId)
  }

  async loadDetailsTransaction(transactionId) {
    const response = await showTransaction(transactionId)
    const { data, status } = response.data
    if (status === 'success') {
      this.setState({ data })
    }
  }

  async handleSubmitDetails(id, values) {
    try {
      const response = await updateTransaction(id, values)
      const { data, status } = response.data
      if (status === 'success') {
        let close = document.getElementById('btn-cancel')
        if (typeof close !== 'undefined') {
          close.click()
        }
        this.setState({ data })
      }
    } catch (e) {
      console.log(e)
    }
  }

  async handleSubmitInfo(id, values) {
    try {
      const response = await updateInfoTransaction(id, values)
      const { data, status } = response.data
      if (status === 'success') {
        let close = document.getElementById('btn-cancel')

        if (typeof close !== 'undefined') {
          close.click()
        }
        this.setState({ data })
      }
    } catch (e) {
      console.log(e)
    }
  }

  toggleImage() {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }))
  }

  render() {
    const { id, name, email, phone, invoice_id, amount, payment_method, payment_method_text, status_text, image, image_url, notes } = this.state.data
    const { address } = this.state.data.donator || {}

    const details = [
      {
        index: 1,
        title: 'Info Donatur',
        items: [
          {
            label: 'Nama',
            text: name
          },
          {
            label: 'Alamat',
            text: address
          },
          {
            label: 'No Tlp',
            text: phone
          },
          {
            label: 'Email',
            text: email
          },
        ]
      },
      {
        index: 2,
        title: 'Detail Donasi',
        items: [
          {
            label: 'Tipe Donasi',
            text: (typeof this.state.data.campaign !== 'undefined') ? this.state.data.campaign.get_type.name : ''
          },
          {
            label: 'Metode Transfer',
            text: payment_method_text
          },
          {
            label: 'Status Donasi',
            text: status_text
          },
          {
            label: 'Catatan',
            text: notes
          }
        ]
      }
    ]
    return (
      <>
        <Main title={invoice_id}>
          <Row className="mt-4 mb-5">
            {details.map((detail, index) => {
              return (
                <Col md="4" key={index}>
                  <InformationCard
                    title={detail.title}
                    items={detail.items}
                    index={detail.index} id={id}
                    data={this.state.data}
                    handleSubmitDetails={this.handleSubmitDetails}
                    handleSubmitInfo={this.handleSubmitInfo}
                  />
                </Col>
              )
            })}
            {(image !== null) &&
              <Card className="card-transaction col-md-4">
                <CardBody>
                  <CardTitle>
                    <label>Bukti Pembayaran</label>
                    <hr className="mt-1 mb-1" />
                    <div className="mb-2 hovereffect mt-3">

                      <img src={image_url} alt="foto bukti pembayaran" className="img-fluid img-thumbnail img-kwitansi-size" />
                      <div className="overlay-kwitansi btn-kwitansi">
                        <span>
                          <button onClick={this.toggleImage} className="btn btn-table circle-table view-img mr-2" data-toggle="tooltip" data-placement="top" title="" data-original-title="Lihat Gambar"></button>
                        </span>
                        <span data-toggle="modal" role="button" data-target="#ModalMediaLibrary">
                          <button className="btn btn-table circle-table edit-table" data-toggle="tooltip" data-placement="top" title="" data-original-title="Ubah Gambar"></button>
                        </span>
                      </div>
                    </div>

                  </CardTitle>
                </CardBody>
              </Card>
            }
          </Row>
          <Row>
            <Col>
              {typeof this.state.data.campaign !== 'undefined' && this.state.data.campaign.fundraising === 1 ? (
                <FundraisingTable data={this.state.data} amount={amount} />
              ) : (
                  <NonFundraisingTable data={this.state.data} amount={amount} />
                )}
            </Col>
          </Row>
          <Row>
            <Col>
              <Modal className="modal-lg" isOpen={this.state.isOpen} toggle={this.toggleImage}>
                <ModalBody className="mb-0 p-0">
                  <img src={image_url} style={{ width: '100%' }} />
                </ModalBody>
                <ModalFooter>
                  <Button color='secondary' onClick={this.toggleImage}>Tutup</Button>{' '}
                </ModalFooter>
              </Modal>
            </Col>
          </Row>
        </Main>
      </>
    )
  }
}