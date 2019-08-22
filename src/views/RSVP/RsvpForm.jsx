import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Button, Col, FormFeedback, FormGroup, Input, Row } from 'reactstrap'
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


class RsvpForm extends Component {
  constructor (props) {
    super(props)

    const { campaignType } = this.props.match.params

    this.state = {
      rsvp: {
        title: '',
        description: '',
        village_id:''
      },
      previewImgUrl: require('assets/images/image-plus.svg')
    }
    this.loadRsvp = this.loadRsvp.bind(this)
    this.handleSaveRsvp = this.handleSaveRsvp.bind(this)
    this.handleFileUpload = this.handleFileUpload.bind(this)
  }

  componentDidMount () {
    
  }

  async loadRsvp (rsvpId) {
    
  }

  handleFileUpload (event) {
    const file = event.target.files[0]

    if (file) {
      generatePreviewImgUrl(file, previewImgUrl => { this.setState({ previewImgUrl }) })
    }
  }

  async handleSaveRsvp (rsvp) {
    
  }

  render () {
    const title = 'Form RSVP'
    const { rsvp, previewImgUrl } = this.state

    return (
      <div className='row pl-3'>
        <Formik
          enableReinitialize
          initialValues={rsvp}
          onSubmit={(values, { setSubmitting }) => {
            this.handleSaveRsvp(values)
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
                  <label htmlFor='title'>Judul Kejadian</label>
                  <Field
                    name='title'
                    render={({ field }) => (
                      <Input {...field} id='title' maxLength={255} invalid={errors.title !== undefined} />
                    )}
                  />
                  {errors.title !== undefined ? <FormFeedback>{errors.title}</FormFeedback> : ''}
                </FormGroup>
                
                <div>
                  <label>Lokasi Kejadian</label>
                  <hr/>
                  <Row>
                    <Col md='6'>
                      <FormGroup>
                        <label htmlFor='subdistrict'>Propinsi</label>
                        <Input id="subdistrict" type="select" defaultValue='DKI Jakarta'>
                          <option>DKI Jakarta</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md='6'>
                      <FormGroup>
                        <label htmlFor='subdistrict'>Kabupaten/Kota</label>
                        <Input id="subdistrict" type="select">
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md='6'>
                      <FormGroup>
                        <label htmlFor='subdistrict'>Kecamatan</label>
                        <Input id="subdistrict" type="select">
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md='6'>
                      <FormGroup>
                        <label htmlFor='village_id'>Kelurahan</label>
                        <Field
                          name='village_id'
                          render={({ field })=>(
                            <Input {...field} id="village_id" type="select">
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                            </Input>
                          )}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
                <FormGroup>
                  <label htmlFor='description'>Deskripsi</label>
                  <Field
                    name='description'
                    render={({ field }) => (
                      <Input {...field} id="description" type="textarea" />
                    )}
                  />
                  {errors.description !== undefined ? <FormFeedback>{errors.description}</FormFeedback> : ''}
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
    )
  }
}

export default withRouter(RsvpForm)
