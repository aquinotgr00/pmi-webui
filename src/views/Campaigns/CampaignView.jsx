import React, { Component } from 'react'
import { Main } from 'components'
import { viewCampaignApi } from 'services/api'
import { formatCurrency } from 'utils/number'

export default class CampaignView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: false,
      error: null,
      campaign: {}
    }

    this.loadCampaign = this.loadCampaign.bind(this)
  }

  componentDidMount () {
    const { campaignId } = this.props.match.params
    if (campaignId) {
      this.loadCampaign(campaignId)
    }
  }

  async loadCampaign (campaignId) {
    this.setState({ isLoading: true, error: null })

    const response = await viewCampaignApi(campaignId)
    const { status } = response.data

    if (status === 'success') {
      const { data: campaign } = response.data
      this.setState({ isLoading: false, campaign })
    } else {
      this.setState({ isLoading: false, error: null })
    }
  }

  render () {
    const { type_id, title, description, image, ranges_donation, amount_goal, amount_real } = this.state.campaign

    let donationType = '-'
    switch (type_id) {
      case 1:
        donationType = 'Umum'
        break
      case 2:
        donationType = 'Khusus'
        break
      default:
    }
    return (
      <Main title={title}>
        <div className='row pl-3'>
          <form class="col-md-6 col-lg7 pl-0">
            <div className='form-group'>
              <label>Deskripsi</label>
              <p className='mb-5'>{description}</p>
            </div>

            <div className='row mb-4'>
              <div className='col-sm-2 form-group'>
                <label for='#'>Tipe Donasi</label>
                <p>{donationType}</p>
              </div>
              <div className='col-sm-4 form-group'>
                <label>Rentang Waktu</label>
                <p>{ranges_donation}</p>
              </div>
              <div className='col-sm-3 form-group'>
                <label>Donasi Terkumpul</label>
                <p>{amount_real?formatCurrency(amount_real):'-'}</p>
              </div>
              <div className='col-sm-3 form-group'>
                <label>Target Donasi</label>
                <p>{amount_goal?formatCurrency(amount_goal):'-'}</p>
              </div>
            </div>

            <div>
              <label>Riwayat Donasi</label>
              <hr className='mt-0' />

              <div className='col-md-6 pl-0'>
                <div className='form-group'>
                  <label>Rentang Waktu</label>
                  <input type='text' className='form-control' id='datetimepicker1' />
                </div>
              </div>

              <div className='table-responsive'>
                <table className='table table-hover'>
                  <thead>
                    <tr>
                      <th scope='col'>Tanggal</th>
                      <th scope='col'>Nama Donatur</th>
                      <th scope='col'>Jumlah Donasi</th>
                    </tr>
                  </thead>
                  <tbody />
                </table>
              </div>

            </div>
          </form>
          <div className='col-md-4 col-lg-5 pl-5 grs'>
            <div className='mb-4'>
              <label>Gambar Utama</label>
              <div className='mb-2 hovereffect'>
                <img className='img-fluid img-thumbnail img-featured-size' src={ image } alt='' />
                <div className='overlay btn-img'>
                  <span>
                    <a href='#' className='btn btn-table circle-table view-img mr-2' data-toggle='tooltip' data-placement='top' title='' data-original-title='Lihat Gambar' />
                  </span>
                  <span data-toggle='modal' role='button' data-target='#ModalMediaLibrary'>
                    <a href='#' className='btn btn-table circle-table edit-table' data-toggle='tooltip' data-placement='top' title='' data-original-title='Ubah Gambar' />
                  </span>
                </div>
              </div>
              <small>
                <span>Image size must be 1920x600 with maximum file size</span>
                <span>400 kb</span>
              </small>
            </div>
          </div>

        </div>
      </Main>
    )
  }
}
