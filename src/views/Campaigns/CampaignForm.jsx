import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Button, FormFeedback, FormGroup, Input } from 'reactstrap'
import { Formik, Form, Field, connect, getIn } from 'formik'
import { Editor } from '@tinymce/tinymce-react'
import Faker from 'faker'
import { Main } from 'components'
import ucwords from 'utils/string'
import CampaignSchema from 'validators/campaign'
import { createCampaignApi, getCampaignApi, updateCampaignApi } from 'services/api'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'

function generatePreviewImgUrl(file, callback) {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onloadend = e => callback(reader.result)
}

class CampaignForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      campaign: {
        title: '',
        type_id: 1,
        fundraising: 0,
        description: '',
        amount_goal: 0,
        start_campaign: new Date(),
        finish_campaign: new Date(),
        publish: 0
      },
      previewImgUrl: require('assets/images/image-plus.svg')
    }
    this.loadCampaign = this.loadCampaign.bind(this)
    this.handleSaveCampaign = this.handleSaveCampaign.bind(this)
    this.handleSaveUpdateCampaign = this.handleSaveUpdateCampaign.bind(this)
    this.handleFileUpload = this.handleFileUpload.bind(this)
  }

  componentDidMount() {
    const { campaignType, campaignId } = this.props.match.params
    if (campaignId) {
      this.loadCampaign(campaignId)
    } else {
      if (process.env.NODE_ENV === 'development') {
        this.setState({
          campaign: {
            title: Faker.lorem.sentences().substring(0, 255),
            type_id: campaignType === 'bulan-dana' ? 3 : 1,
            fundraising: campaignType !== 'donasi-barang',
            description: Faker.lorem.paragraphs(),
            amount_goal: Faker.random.number({ min: 10000000, max: 200000000 }),
            start_campaign: new Date(),
            finish_campaign: new Date(),
            publish: 0
          }
        })
      }
    }
  }

  async loadCampaign(campaignId) {
    this.setState({ isLoading: true, error: null })

    try {
      const response = await getCampaignApi(campaignId)
      const { status } = response.data
      if (status === 'success') {
        const { data: campaign } = response.data
        if (campaign.amount_goal === null) {
          campaign.amount_goal = 0
        }
        let start_date    = (campaign.start_campaign === null)? new Date() : campaign.start_campaign
        let finish_date   = (campaign.finish_campaign === null)? new Date() : campaign.finish_campaign
        let previewImage  = (campaign.image === null)? require('assets/images/image-plus.svg') : campaign.image 
        this.setState({ 
          isLoading: false, 
          campaign: { ...campaign, start_campaign: moment(start_date).toDate(), finish_campaign: moment(finish_date).toDate() },
          previewImgUrl: previewImage
        })

      } else {
        // TODO : handle error
        this.setState({ isLoading: false, error: null })
      }
    } catch (error) {
      // TODO : handle error
    }
  }

  handleFileUpload(event) {
    const file = event.target.files[0]

    if (file) {
      generatePreviewImgUrl(file, previewImgUrl => { this.setState({ previewImgUrl }) })
    }
  }

  async handleSaveCampaign(campaign) {
    this.setState({ isLoading: true, error: null })
    try {
      const response = await createCampaignApi(campaign)
      const { status } = response.data
      if (status === 'success') {
        this.setState({ isLoading: false, error: null })
        const { campaignType } = this.props.match.params
        const { history } = this.props

        history.push(`/admin/campaigns/${campaignType}`)
      } else {
        // TODO : handle errors
        this.setState({ isLoading: false, error: null })
      }
    } catch (error) {
      // TODO : handle errors
      this.setState({ isLoading: false, error: null })
    }
  }

  async handleSaveUpdateCampaign(campaignId, campaign) {
    this.setState({ isLoading: true, error: null })
    try {
      const response = await updateCampaignApi(campaignId, campaign)
      const { status } = response.data
      if (status === 'success') {
        this.setState({ isLoading: false, error: null })
        const { campaignType } = this.props.match.params
        const { history } = this.props

        history.push(`/admin/campaigns/${campaignType}`)
      } else {
        // TODO : handle errors
        this.setState({ isLoading: false, error: null })
      }
    } catch (error) {
      // TODO : handle errors
      this.setState({ isLoading: false, error: null })
    }
  }

  render() {
    const { campaignType, campaignId } = this.props.match.params
    const campaignCategory = ucwords(campaignType.split('-').join(' '))
    const title = campaignId ? `Edit ${campaignCategory}` : `Tambah ${campaignCategory} Baru`
    const { campaign, previewImgUrl } = this.state

    return (
      <Main title={title}>
        <div className='row pl-3'>
          <Formik
            enableReinitialize
            validationSchema={CampaignSchema}
            initialValues={campaign}
            onSubmit={(values, { setSubmitting }) => {
              const { campaignId } = this.props.match.params
              if (parseInt(campaignId) > 0) {
                this.handleSaveUpdateCampaign(campaignId, values)
              } else {
                this.handleSaveCampaign(values)
              }
              setSubmitting(false)
            }}
          >
            {({
              values,
              errors,
              setFieldValue,
              handleSubmit,
              isSubmitting
            }) => (
                <>
                  <Form className='col-md-6 col-lg7 pl-0' onSubmit={handleSubmit}>
                    <FormGroup>
                      <label htmlFor='title'>Judul</label>
                      <Field
                        name='title'
                        render={({ field }) => (
                          <Input {...field} id='title' maxLength={255} invalid={errors.title !== undefined} />
                        )}
                      />
                      {errors.title !== undefined ? <FormFeedback>{errors.title}</FormFeedback> : ''}
                    </FormGroup>

                    {(campaignType !== 'bulan-dana') &&
                      (
                        <FormGroup>
                          <label htmlFor='title'>Tipe Donasi</label>
                          <Field
                            name='type_id'
                            render={({ field }) => (
                              <select {...field} id='type_id' className='form-control' value={values.type_id}>
                                <option value={1} checked>Umum</option>
                                <option value={2}>Khusus</option>
                              </select>
                            )}
                          />
                          {errors.type_id !== undefined ? <FormFeedback>{errors.type_id}</FormFeedback> : ''}
                        </FormGroup>
                      )
                    }

                    <FormGroup>
                      <label htmlFor='description'>Deskripsi</label>

                      <Field
                        name='description'
                        render={({ field }) => (
                          <Editor
                            apiKey='jv18ld1zfu6vffpxf0ofb72orrp8ulyveyyepintrvlwdarp'
                            initialValue={values.description}
                            init={{
                              plugins: 'link image code',
                              toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code',
                              height: 250,
                              content_style: 'p {font-size:0.8em; font-weight:300}'
                            }}
                          />
                        )}
                      />
                      {errors.description !== undefined ? <FormFeedback>{errors.description}</FormFeedback> : ''}
                    </FormGroup>

                    <FormGroup>
                      <label htmlFor='amount_goal'>Target Dana Donasi</label>
                      <Field
                        name='amount_goal'
                        render={({ field }) => (
                          <Input {...field} type='number' id='amount_goal' invalid={errors.amount_goal !== undefined} />
                        )}
                      />
                      {errors.amount_goal !== undefined ? <FormFeedback>{errors.amount_goal}</FormFeedback> : ''}
                    </FormGroup>
                    <FormGroup className='form-group'>
                      <label htmlFor='duration'>Rentang Waktu Donasi</label>
                      <div className='form-row'>
                        <div className='col-md'>
                          <Field
                            name='start_campaign'
                            render={({ field }) => (
                              <DatePicker
                                selected={values.start_campaign}
                                onChange={date => setFieldValue('start_campaign', date)}
                                className='form-control react-datepicker' placeholder='Tanggal Mulai'
                                dateFormat="yyyy-MM-dd"
                              />
                            )}
                          />

                        </div>
                        <div className='col-md'>
                          <Field
                            name='finish_campaign'
                            render={({ field }) => (
                              <DatePicker
                                selected={values.finish_campaign}
                                onChange={date => setFieldValue('finish_campaign', date)}
                                className='form-control react-datepicker' placeholder='Tanggal Selesai'
                                dateFormat="yyyy-MM-dd"
                              />
                            )}
                          />

                        </div>
                      </div>

                    </FormGroup>

                    <Input name='image' type='file' id='file-input'
                      className='hidden-file-input'
                      onChange={event => {
                        const file = event.target.files[0]

                        if (file) {
                          setFieldValue('image_file', file)
                          generatePreviewImgUrl(file, previewImgUrl => { this.setState({ previewImgUrl }) })
                        }
                      }}
                    />

                    <div className='d-flex flex-row-reverse mt-4'>
                      <Button type='button'
                        disabled={isSubmitting}
                        onClick={() => {
                          setFieldValue('publish', 1, false)
                          handleSubmit()
                        }}
                        className='btn btn-success ml-4'
                      >
                        Publish
                      </Button>

                      <Button type='button'
                        disabled={isSubmitting}
                        onClick={() => {
                          setFieldValue('publish', 0, false)
                          handleSubmit()
                        }}
                        className='btn btn-outline-secondary'>
                        Simpan ke Draft
                      </Button>
                    </div>

                  </Form>

                  <div className='col-md-4 col-lg-5 pl-5 grs'>
                    <div className='mb-4'>
                      <label>Gambar Utama</label>
                      <div className='mb-2'>
                        <label htmlFor='file-input' >
                          <img className='img-fluid img-thumbnail add-img-featured' src={previewImgUrl} alt='' />
                        </label>
                      </div>
                      <small>
                        <span>Image size must be 1920x600 with maximum file size</span>
                        <span>400 kb</span>
                      </small>
                      <div className='is-invalid form-control d-none' />
                      <div className='invalid-feedback'>
                        {connect(function (props) {
                          const error = getIn(props.formik.errors, props.name)
                          return error.image_file || null
                        })()}
                      </div>
                    </div>
                  </div>
                </>
              )}
          </Formik>
        </div>
      </Main>
    )
  }
}

export default withRouter(CampaignForm)
