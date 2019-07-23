import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Button, Col, FormFeedback, FormGroup, Input, Row } from 'reactstrap'
import { Formik, Form, Field } from 'formik'
import { Editor } from '@tinymce/tinymce-react'
import DateRangePicker from '@wojtekmaj/react-daterange-picker'
import Faker from 'faker'
import { Main } from 'components'
import ucwords from 'utils/string'
import CampaignSchema from 'validators/campaign'
import { getCampaignApi } from 'services/api'

function generatePreviewImgUrl (file, callback) {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onloadend = e => callback(reader.result)
}

class CampaignForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      campaign: {
        title: '',
        description: '',
        amount_goal: 0,
        publish: 0

      },
      dateRange: [new Date(), new Date()],
      previewImgUrl: require('assets/images/image-plus.svg')
    }
    this.loadCampaign = this.loadCampaign.bind(this)
    this.handleSaveCampaign = this.handleSaveCampaign.bind(this)
    this.handleFileUpload = this.handleFileUpload.bind(this)
  }

  componentDidMount () {
    const { campaign, campaignId } = this.props.match.params

    if (campaignId) {
      this.loadCampaign(campaignId)
    } else {
      if (process.env.NODE_ENV === 'development') {
        this.setState({ campaign: {
          title: Faker.lorem.sentences(),
          description: Faker.lorem.paragraphs(),
          amount_goal: Faker.random.number({ min: 10000000, max: 200000000 }),
          publish: 0
        } })
      }
    }
  }

  async loadCampaign (campaignId) {
    this.setState({ isLoading: true, error: null })

    try {
      const response = await getCampaignApi(campaignId)
      const { status } = response.data
      console.log(response.data)
      if (status === 'success') {
        const { data: campaign } = response.data
        if (campaign.amount_goal === null) {
          campaign.amount_goal = 0
        }
        this.setState({ isLoading: false, campaign })
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

  handleSaveCampaign (campaign) {
    console.log(campaign)
    const { campaignType } = this.props.match.params
    const { history } = this.props

    // history.replace(`/admin/campaigns/${campaignType}`)
  }

  render () {
    const { campaignType, campaignId } = this.props.match.params
    const campaignCategory = ucwords(campaignType.split('-').join(' '))
    const title = campaignId ? `Edit ${campaignCategory}` : `Tambah ${campaignCategory} Baru`
    const { campaign } = this.state
    const { previewImgUrl } = this.state
    return (
      <Main title={title}>
        <div className='row pl-3'>
          <Formik
            enableReinitialize
            validationSchema={CampaignSchema}
            initialValues={campaign}
            onSubmit={(values, { setSubmitting }) => {
              this.handleSaveCampaign(values)
              // setSubmitting(false)
            }}
          >
            {({
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
                        <Input {...field} id='title' invalid={errors.title !== undefined} />
                      )}
                    />
                    {errors.title !== undefined ? <FormFeedback>{errors.title}</FormFeedback> : ''}
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor='description'>Deskripsi</label>

                    <Field
                      name='description'
                      render={({ field }) => (
                        <Editor
                          apiKey='jv18ld1zfu6vffpxf0ofb72orrp8ulyveyyepintrvlwdarp'
                          initialValue={campaign.description}
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
                    <Row>
                      <Col>
                        <Field
                          name='duration'
                          render={({ field }) => (
                            <DateRangePicker {...field}
                              calendarIcon={null}
                              clearIcon={null}
                              className='date-range-input'
                              onChange={dateRange => this.setState({ dateRange })}
                              value={this.state.dateRange}
                              format='d-MMM-y'
                            />
                          )}
                        />
                        {errors.duration !== undefined ? <FormFeedback>{errors.duration}</FormFeedback> : ''}
                      </Col>

                    </Row>

                  </FormGroup>

                  <Input name='image' type='file' id='file-input'
                    className='hidden-file-input'
                    onChange={event => {
                      const file = event.target.files[0]

                      if (file) {
                        setFieldValue('image', file)
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
                  </div>
                </div>
              </>
            )
            }
          </Formik>
        </div>
      </Main>
    )
  }
}

export default withRouter(CampaignForm)
