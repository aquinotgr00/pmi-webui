import React, { Component } from 'react'
import { Button, Col, FormFeedback, FormGroup, Input, Row } from 'reactstrap'
import { Formik, Form, Field } from 'formik'
import DatePicker from 'react-datepicker'
import { Editor } from '@tinymce/tinymce-react'
import Faker from 'faker'
import moment from 'moment'
import { Main } from 'components'
import ucwords from 'utils/string'
import CampaignSchema from 'validators/campaign'

import 'react-datepicker/dist/react-datepicker.css'

export default class CampaignEditor extends Component {
  constructor (props) {
    super(props)
    this.state = {
      campaign: {
        title: '',
        description: '',
        amount_goal: 0,
        publish:0
      }
    }
    this.loadCampaign = this.loadCampaign.bind(this)
    this.handleSaveCampaign = this.handleSaveCampaign.bind(this)
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
          publish:0
        } })
      }
    }
  }

  loadCampaign (campaignId) {

  }

  handleSaveCampaign (campaign) {
    console.log(campaign)
  }

  render () {
    const { campaignType, campaignId } = this.props.match.params
    const campaignCategory = ucwords(campaignType.split('-').join(' '))
    const title = campaignId ? `Edit ${campaignCategory}` : `Tambah ${campaignCategory} Baru`
    const { campaign } = this.state
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
                          min_height: 270
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

                  <Row form>
                    <Col md={6}>
                      <DatePicker
                        selectsStart
                        startDate={moment()}
                        className='form-control'
                      />

                    </Col>
                    <Col md={6}>
                      <DatePicker
                        selectsEnd
                        startDate={moment()}
                        minDate={moment()}
                        className='form-control'
                      />
                    </Col>
                  </Row>

                </FormGroup>

                <div className='d-flex flex-row-reverse mt-4'>
                  <Button type='button' onClick={() => {
                    setFieldValue('publish', 1, false)
                    handleSubmit()
                  }} className='btn btn-success ml-4'>Publish</Button>
                  <Button type='button' onClick={() => {
                    setFieldValue('publish', 0, false)
                    handleSubmit()
                  }} className='btn btn-outline-secondary'>Simpan ke Draft</Button>
                </div>
              </Form>

            )}
          </Formik>
        </div>
      </Main>
    )
  }
}
