import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Button, FormFeedback, FormGroup, Input } from 'reactstrap'
import { Formik, Form, Field, connect, getIn } from 'formik'
import { Editor } from '@tinymce/tinymce-react'
import Faker from 'faker'
import { Main } from 'components'
import ucwords from 'utils/string'
import AddCampaignSchema from 'validators/addCampaign'
import UpdateCampaignSchema from 'validators/updateCampaign'
import { createCampaignApi, getCampaignApi, updateCampaignApi } from 'services/api'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'

function generatePreviewImgUrl (file, callback) {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onloadend = e => callback(reader.result)
}

function dataURLtoFile (dataurl, filename) {
  var arr = dataurl.split(','); var mime = arr[0].match(/:(.*?);/)[1]
  var bstr = atob(arr[1]); var n = bstr.length; var u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}

class CampaignForm extends Component {
  constructor (props) {
    super(props)

    const { campaignType } = this.props.match.params

    this.state = {
      campaign: {
        title: '',
        type_id: 1,
        fundraising: campaignType !== 'donasi-barang',
        description: '',
        amount_goal: 0,
        start_campaign: undefined,
        finish_campaign: undefined,
        publish: 0
      },
      previewImgUrl: require('assets/images/image-plus.svg')
    }
    this.loadCampaign = this.loadCampaign.bind(this)
    this.handleSaveCampaign = this.handleSaveCampaign.bind(this)
    this.handleFileUpload = this.handleFileUpload.bind(this)
  }

  componentDidMount () {
    const { campaignType, campaignId } = this.props.match.params
    console.log(campaignType)
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
            start_campaign: undefined,
            finish_campaign: undefined,
            publish: 0
          }
        })
      }
    }
  }

  async loadCampaign (campaignId) {
    this.setState({ isLoading: true, error: null })

    try {
      const response = await getCampaignApi(campaignId)
      const { status } = response.data
      if (status === 'success') {
        const { data: campaign } = response.data
        if (campaign.amount_goal === null) {
          campaign.amount_goal = 0
        }
        const startDate = (campaign.start_campaign === null) ? new Date() : campaign.start_campaign
        const finishDate = (campaign.finish_campaign === null) ? new Date() : campaign.finish_campaign
        const previewImage = (campaign.image === null) ? require('assets/images/image-plus.svg') : campaign.image
        this.setState({
          isLoading: false,
          campaign: { ...campaign, start_campaign: moment(startDate).toDate(), finish_campaign: moment(finishDate).toDate() },
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

  handleFileUpload (event) {
    const file = event.target.files[0]

    if (file) {
      generatePreviewImgUrl(file, previewImgUrl => { this.setState({ previewImgUrl }) })
    }
  }

  async handleSaveCampaign (campaign) {
    this.setState({ isLoading: true, error: null })
    try {
      campaign = {
        ...campaign,
        start_campaign: campaign.start_campaign ? moment(campaign.start_campaign).format('YYYY-MM-DD') : undefined,
        finish_campaign: campaign.finish_campaign ? moment(campaign.finish_campaign).format('YYYY-MM-DD') : undefined
      }

      const { campaignId } = this.props.match.params

      const response = campaignId ? await updateCampaignApi(campaignId, campaign) : await createCampaignApi(campaign)

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

  render () {
    const { campaignType, campaignId } = this.props.match.params
    const campaignCategory = ucwords(campaignType.split('-').join(' '))
    const title = campaignId ? `Edit ${campaignCategory}` : `Tambah ${campaignCategory} Baru`
    const validationSchema = campaignId ? AddCampaignSchema : UpdateCampaignSchema
    const { campaign, previewImgUrl } = this.state

    return (
      <Main title={title}>
        <div className='row pl-3'>
          <Formik
            enableReinitialize
            validationSchema={validationSchema}
            initialValues={campaign}
            onSubmit={(values, { setSubmitting }) => {
              this.handleSaveCampaign(values)
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
                          value={values.description}
                          onChange={e => setFieldValue('description', e.target.getContent())}
                        />
                      )}
                    />
                    {errors.description !== undefined ? <FormFeedback>{errors.description}</FormFeedback> : ''}
                  </FormGroup>

                  {values.fundraising
                    ? <FormGroup>
                      <label htmlFor='amount_goal'>Target Dana Donasi</label>
                      <Field
                        name='amount_goal'
                        render={({ field }) => (
                          <Input {...field} type='number' id='amount_goal' invalid={errors.amount_goal !== undefined} />
                        )}
                      />
                      {errors.amount_goal !== undefined ? <FormFeedback>{errors.amount_goal}</FormFeedback> : ''}
                    </FormGroup>
                    : null
                  }

                  <FormGroup className='form-group'>
                    <label htmlFor='duration'>Rentang Waktu Donasi</label>
                    <div className='form-row'>
                      <div className='date col-md-6'>
                        <Field
                          name='start_campaign'
                          render={({ field }) => (
                            <DatePicker
                              selected={values.start_campaign}
                              onChange={date => setFieldValue('start_campaign', date)}
                              className='form-control react-datepicker' placeholder='Tanggal Mulai'
                              dateFormat='dd MMM yyyy'
                            />
                          )}
                        />
                      </div>
                      <div className='date col-md-6'>
                        <Field
                          name='finish_campaign'
                          render={({ field }) => (
                            <DatePicker
                              selected={values.finish_campaign}
                              onChange={date => setFieldValue('finish_campaign', date)}
                              className='form-control react-datepicker' placeholder='Tanggal Selesai'
                              dateFormat='dd MMM yyyy'
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
