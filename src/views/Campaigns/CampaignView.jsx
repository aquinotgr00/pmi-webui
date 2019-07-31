import React, { Component } from 'react'
import { Main } from 'components'
import { getCampaignApi,geyDonatorByCampaignApi } from 'services/api'
import DateRangePicker from '@wojtekmaj/react-daterange-picker'
import moment from 'moment'
import { formatCurrency } from 'utils/number'
import ucwords from 'utils/string'

export default class CampaignView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      error: null,
      campaign: {},
      date: [new Date(), new Date()],
      donators: []
    }

    this.loadCampaign     = this.loadCampaign.bind(this)
    this.handleDateRanges = this.handleDateRanges.bind(this)
    this.loadDonators     = this.loadDonators.bind(this)
  }

  handleDateRanges(date) {
    if (date !== null) {
      let start = new Date(date[0])
      let finish = new Date(date[1])

      let startMonthAdd = parseInt(start.getMonth() + 1)
      let finishMonthAdd = parseInt(finish.getMonth() + 1)

      let startMonth = (startMonthAdd < 10) ? '0' + startMonthAdd : startMonthAdd
      let finishMonth = (finishMonthAdd < 10) ? '0' + finishMonthAdd : finishMonthAdd

      let startDate = (start.getDate() < 10) ? '0' + start.getDate() : start.getDate()
      let finishDate = (finish.getDate() < 10) ? '0' + finish.getDate() : finish.getDate()

      let startFrom = this.state.date[0].getFullYear() + "-" + startMonth + "-" + startDate
      let finishTo = this.state.date[1].getFullYear() + "-" + finishMonth + "-" + finishDate

      const { id: campaignId } = this.state.campaign
      this.setState({ date });
      this.loadDonators(campaignId,startFrom,finishTo)
    }
  }

  componentDidMount() {
    const { campaignId } = this.props.match.params
    if (campaignId) {
      this.loadCampaign(campaignId)
      this.loadDonators(campaignId)
    }
  }

  async loadCampaign(campaignId) {
    this.setState({ isLoading: true, error: null })

    const response = await getCampaignApi(campaignId)
    const { status } = response.data

    if (status === 'success') {
      const { data: campaign } = response.data
      this.setState({ isLoading: false, campaign })
    } else {
      this.setState({ isLoading: false, error: null })
    }
  }

  async loadDonators(campaignId, from='',to=''){
    const donatorParams = new URLSearchParams()
    donatorParams.append('from',from)
    donatorParams.append('to',to)
    const response = await geyDonatorByCampaignApi(campaignId,donatorParams)
    const { status, data: list } = response.data
    const { data:donators } = list
    if (status === 'success') {
      this.setState({ donators })
    }
  }

  render() {
    const { type_id, title, description, image, ranges_donation: rangeDonation, amount_goal: goal, amount_real: realAmount } = this.state.campaign
    const list_donators = this.state.donators || {}
    
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
          <form className='col-md-6 col-lg7 pl-0'>
            <div className='form-group'>
              <label>Deskripsi</label>
              <p className='mb-5'>{description}</p>
            </div>

            <div className='row mb-4'>
              <div className='col-sm-2 form-group'>
                <label>Tipe Donasi</label>
                <p>{donationType}</p>
              </div>
              <div className='col-sm-4 form-group'>
                <label>Rentang Waktu</label>
                <p>{rangeDonation}</p>
              </div>
              <div className='col-sm-3 form-group'>
                <label>Donasi Terkumpul</label>
                <p>{realAmount ? formatCurrency(realAmount) : '-'}</p>
              </div>
              <div className='col-sm-3 form-group'>
                <label>Target Donasi</label>
                <p>{goal ? formatCurrency(goal) : '-'}</p>
              </div>
            </div>

            <div>
              <label>Riwayat Donasi</label>
              <hr className='mt-0' />

              <div className='col-md-6 pl-0'>
                <div className='form-group'>
                  <label>Rentang Waktu</label>
                  <br />
                  <DateRangePicker
                    onChange={this.handleDateRanges}
                    value={this.state.date}
                  />
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
                  <tbody>
                    {Object.values(list_donators).map((donator, index) => {
                      return (
                        <tr key={index}>
                          <td>{ moment(donator.created_at).format("YYYY-MM-DD") }</td>
                          <td>{ ucwords(donator.name) }</td>
                          <td>{donator.campaign.fundraising === 1 ? formatCurrency(donator.amount) : donator.amount }</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

            </div>
          </form>
          <div className='col-md-4 col-lg-5 pl-5 grs'>
            <div className='mb-4'>
              <label>Gambar Utama</label>
              <div className='mb-2 hovereffect'>
                <img className='img-fluid img-thumbnail img-featured-size' src={image} alt='' />
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
