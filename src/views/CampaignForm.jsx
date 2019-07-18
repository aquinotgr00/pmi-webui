import React, { Component } from 'react'
import { Form } from 'reactstrap'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import { Main } from 'components'
import ucwords from 'utils/string'

import 'react-datepicker/dist/react-datepicker.css'

export default class CampaignForm extends Component {
  constructor (props) {
    super(props)

    this.loadCampaign = this.loadCampaign.bind(this)
  }

  componentDidMount () {
    const { campaign, campaignId } = this.props.match.params
    console.log(campaign)
    if (campaignId) {
      this.loadCampaign(campaignId)
    }
  }

  loadCampaign (campaignId) {

  }

  render () {
    const { campaign, campaignId } = this.props.match.params
    const campaignCategory = ucwords(campaign.split('-').join(' '))
    const title = campaignId ? `Edit ${campaignCategory}` : `Tambah ${campaignCategory} Baru`
    return (
      <Main title={title}>
        <div className='row pl-3'>
          <Form className='col-md-6 col-lg7 pl-0'>

            <div className='form-group'>
              <label htmlFor='title'>Judul</label>
              <input type='text' name='title' className='form-control' id='title' />
            </div>
            <div className='form-group'>
              <label htmlFor='description'>Deskripsi</label>
              <textarea name='description' className='form-control' id='description' rows='4' />
            </div>
            <div className='form-group'>
              <label htmlFor='amount_goal'>Target Dana Donasi</label>
              <input type='number' name='amount_goal' className='form-control' id='amount_goal' />
            </div>
            <div className='form-group'>
              <label htmlFor='duration'>Rentang Waktu Donasi</label>
              <input type='text' className='form-control' id='duration' placeholder='' />
              <DatePicker
                selectsStart
                startDate={moment()}
                className='form-control'
              />
              <DatePicker
                selectsEnd
                startDate={moment()}
                minDate={moment()}
                className='form-control'
              />
            </div>

            <div className='d-flex flex-row-reverse mt-4'>
              <button type='submit' className='btn btn-success ml-4'>Publish</button>
              <button type='submit' className='btn btn-outline-secondary'>Simpan ke Draft</button>
            </div>

          </Form>

          <div className='col-md-4 col-lg-5 pl-5 grs'>
            <div className='mb-4'>
              <label htmlFor='exampleFormControlSelect1'>Gambar Utama</label>
              <div className='mb-2'>
                <a data-toggle='modal' data-target='#ModalMediaLibrary'>
                  <img className='img-fluid img-thumbnail add-img-featured' src={require('assets/images/image-plus.svg')} alt='' />
                </a>
              </div>
              <small><span>Image size must be 1920x600 with maximum file size</span>
                <span>400 kb</span></small>
            </div>
          </div>
        </div>
      </Main>
    )
  }
}
