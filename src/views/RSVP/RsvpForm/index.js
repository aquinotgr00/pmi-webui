import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Col, FormFeedback, FormGroup, Input, Row } from 'reactstrap'
import { Formik, Form, Field, connect, getIn } from 'formik'
import Faker from 'faker'
import { Main, ImagePickerPreview, CitySelect, RejectionModal, SubdistrictSelect, VillageSelect } from 'components'
import AddRsvpSchema from 'validators/addRsvp'
import UpdateRsvpSchema from 'validators/updateRsvp'
import { ApprovalButtons, PublishButton, SaveButton } from './Buttons'
import { createRsvpApi, getRsvpApi, updateRsvpApi } from 'services/api'

function generatePreviewImgUrl (file, callback) {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onloadend = e => callback(reader.result)
}

class RsvpForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading:false,
      error:null,
      rsvp: {
        title: '',
        description: '',
        village_id:''
      },
      selectedCityId:'',
      selectedSubdistrictId:'',
      previewImgUrl: require('assets/images/image-plus.svg'),
      rejectModalIsOpen:false
    }
    this.loadRsvp = this.loadRsvp.bind(this)
    this.handleSaveRsvp = this.handleSaveRsvp.bind(this)
    this.handleCityChange = this.handleCityChange.bind(this)
    this.handleSubdistrictChange = this.handleSubdistrictChange.bind(this)
    this.handleVillageChange = this.handleVillageChange.bind(this)
    this.confirmRejection = this.confirmRejection.bind(this)
    this.handleReject = this.handleReject.bind(this)
    this.toggleRejectModal = this.toggleRejectModal.bind(this)
  }

  componentDidMount () {
    const { rsvpId } = this.props.match.params
    if(rsvpId) {
      this.loadRsvp(rsvpId)
    }
  }

  async loadRsvp (rsvpId) {
    this.setState({ isLoading: true, error: null })

    try {
      const response = await getRsvpApi(rsvpId)
      const { status } = response.data
      if (status === 'success') {
        const { data: rsvp } = response.data
        const previewImgUrl = rsvp.image?rsvp.image_url:require('assets/images/image-plus.svg')
        const { village } = rsvp
        this.setState({
          isLoading: false,
          rsvp,
          selectedCityId:village?village.subdistrict.city.id:'',
          selectedSubdistrictId:village?village.subdistrict.id:'',
          previewImgUrl
        })
      } else {
        // TODO : handle error
        this.setState({ isLoading: false, error: null })
      }
    } catch (error) {
      // TODO : handle error
    }
  }

  handleCityChange (selectedCityId) {
    this.setState({selectedCityId, selectedSubdistrictId:'', village_id:''})
  }

  handleSubdistrictChange(selectedSubdistrictId) {
    this.setState({selectedSubdistrictId, village_id:''})
  }

  handleVillageChange(village_id) {
    this.setState({rsvp:{...this.state.rsvp,village_id}})
  }

  async handleSaveRsvp (rsvp) {
    const { rsvpId } = this.props.match.params
    this.setState({ isLoading: true, error: null })
    try {
      const response = await (rsvpId?updateRsvpApi(rsvpId,rsvp):createRsvpApi(rsvp))
      const { status } = response.data
      if (status === 'success') {

        // redirection
        const { history, match } = this.props
        history.push(`/admin/rsvp/${match.params.editMode==='approval'?'moderasi':'list-rsvp'}`)
      }
      else {
        // TODO : handle errors
        this.setState({ isLoading: false, error: null })
      }
    } catch (error) {
      // TODO : handle errors
      this.setState({ isLoading: false, error: null })
    }
  }

  handleReject() {
    this.setState({rejectModalIsOpen:true});
  }

  toggleRejectModal() {
    this.setState({rejectModalIsOpen:!this.state.rejectModalIsOpen});
  }

  confirmRejection(values, { setSubmitting }) {
    const {approved, rejectionReason:reason_rejection} = values
    this.handleSave({approved,reason_rejection})
    setSubmitting(false)
    this.toggleRejectModal()
  }

  render () {
    const { rsvp, previewImgUrl, selectedCityId, selectedSubdistrictId, rejectModalIsOpen } = this.state
    const isGeneralDiscussion = rsvp.id===1
    const { editMode } = this.props.match.params
    return (
      <>
        <Main title='Form RSVP' back>
          <div className='row pl-3'>
            <Formik
              enableReinitialize
              validationSchema={rsvp.id?UpdateRsvpSchema:AddRsvpSchema}
              initialValues={rsvp}
              onSubmit={(values, { setSubmitting }) => {
                const { title, description, village_id, image_file, approved } = values
                this.handleSaveRsvp({title, description, village_id, image_file, ...(editMode==='approval' && {approved})})
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
                            <label htmlFor='province'>Propinsi</label>
                            <Input id="province" type="select" defaultValue='DKI Jakarta' disabled={true}>
                              <option>DKI Jakarta</option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col md='6'>
                          <CitySelect
                            onChange={this.handleCityChange}
                            value={selectedCityId}
                            disabled={isGeneralDiscussion}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col md='6'>
                          <SubdistrictSelect
                            cityId={selectedCityId}
                            onChange={this.handleSubdistrictChange}
                            value={selectedSubdistrictId}
                            disabled={isGeneralDiscussion}
                          />
                        </Col>
                        <Col md='6'>
                          <VillageSelect
                            subdistrictId={selectedSubdistrictId}
                            onChange={this.handleVillageChange}
                            value={rsvp.village_id || ''}
                            disabled={isGeneralDiscussion}
                          />
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
                          setFieldValue('image_file', file)
                          generatePreviewImgUrl(file, previewImgUrl => { 
                            this.setState({ previewImgUrl }) 
                          })
                        }
                      }}
                    />

                    <div className='d-flex flex-row-reverse mt-4'>
                    { editMode==='create' && <PublishButton disabled={isSubmitting} onClick={()=>{ handleSubmit() } } /> }
                    { editMode==='edit' && <SaveButton disabled={isSubmitting} onClick={()=>{ handleSubmit() } } /> }
                    { editMode==='approval' && 
                      <ApprovalButtons
                        disabled={isSubmitting}
                        onReject={this.handleReject}
                        onApprove={() => {
                          setFieldValue('approved', 1, false)
                          handleSubmit()
                        }}
                      />
                    }

                    </div>

                  </Form>

                  <div className='col-md-4 col-lg-5 pl-5 grs'>
                    <div className='mb-4'>
                      <label>Gambar Utama</label>
                      <div className='mb-2'>
                        <label htmlFor='file-input' >
                          {
                            values.image_file
                            ?<ImagePickerPreview url={previewImgUrl} />
                            :<img className='img-fluid img-thumbnail add-img-featured' src={previewImgUrl} alt='' />
                          }
                          
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
        {editMode==='approval' &&
          <RejectionModal
            isOpen={rejectModalIsOpen}
            toggle={this.toggleRejectModal}
            initialValues={{approved:0, rejectionReason:'', rsvpId:rsvp.id}}
            onSubmit={this.confirmRejection}
          />
        }
      </>
    )
  }
}

export default withRouter(RsvpForm)
