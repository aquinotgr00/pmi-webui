import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Button, Col, FormFeedback, FormGroup, Input, Row } from 'reactstrap'
import { Formik, Form, Field, connect, getIn } from 'formik'
import { Editor } from '@tinymce/tinymce-react'
import Faker from 'faker'
import { Main, CitySelect, SubdistrictSelect, VillageSelect } from 'components'
import AddRsvpSchema from 'validators/addRsvp'
import UpdateCampaignSchema from 'validators/updateCampaign'
import { createCampaignApi, getCampaignApi, updateCampaignApi } from 'services/api'
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

    const { rsvpId, editMode } = this.props.match.params
    console.log(rsvpId, editMode)
    this.state = {
      isLoading:false,
      error:null,
      rsvp: {
        title: '',
        description: '',
        selectedCityId:'',
        selectedSubdistrictId:'',
        village_id:''
      },
      previewImgUrl: require('assets/images/image-plus.svg')
    }
    this.loadRsvp = this.loadRsvp.bind(this)
    this.handleSaveRsvp = this.handleSaveRsvp.bind(this)
    this.handleFileUpload = this.handleFileUpload.bind(this)
    this.handleCityChange = this.handleCityChange.bind(this)
    this.handleSubdistrictChange = this.handleSubdistrictChange.bind(this)
    this.handleVillageChange = this.handleVillageChange.bind(this)
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

  handleCityChange (selectedCityId) {
    this.setState({selectedCityId, selectedSubdistrictId:'', village_id:''})
  }

  handleSubdistrictChange(selectedSubdistrictId) {
    this.setState({selectedSubdistrictId, village_id:''})
  }

  handleVillageChange(village_id) {
    this.setState({village_id})
  }

  async handleSaveRsvp (rsvp) {
    //this.setState({ isLoading: true, error: null })

  }

  render () {
    const { rsvp, previewImgUrl } = this.state

    return (
      <Main title='Form RSVP' back>
        <div className='row pl-3'>
          <Formik
            enableReinitialize
            validationSchema={AddRsvpSchema}
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
                  {JSON.stringify(values)}
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
                          <label htmlFor='province'>Propinsi</label>
                          <Input id="province" type="select" defaultValue='DKI Jakarta'>
                            <option>DKI Jakarta</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md='6'>
                        <CitySelect onChange={this.handleCityChange}/>
                      </Col>
                    </Row>
                    <Row>
                      <Col md='6'>
                        <SubdistrictSelect cityId={this.state.selectedCityId} onChange={this.handleSubdistrictChange} />
                      </Col>
                      <Col md='6'>
                        <VillageSelect subdistrictId={this.state.selectedSubdistrictId} onChange={this.handleVillageChange} />
                      </Col>
                    </Row>
                  </div>
                  <hr/>
                  <FormGroup>
                    <label htmlFor='description'>Deskripsi Singkat</label>
                    <Field
                      name='description'
                      render={({ field }) => (
                        <Input {...field} id="description" type="textarea" rows={4} invalid={errors.description !== undefined}/>
                      )}
                    />
                    {errors.description !== undefined ? <FormFeedback>{errors.description}</FormFeedback> : ''}
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
                        return error.image || null
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

export default withRouter(RsvpForm)
