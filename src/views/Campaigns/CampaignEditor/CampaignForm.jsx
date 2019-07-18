import React from 'react'
import { Col, FormFeedback, FormGroup, Input, Row } from 'reactstrap'
import { Formik, Form, Field, FieldArray } from 'formik'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import CreateCampaignSchema from 'validators/campaignCreate'

export default class CampaignForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      campaign: {title:''}
    }
    this.loadCampaign = this.loadCampaign.bind(this)
  }

  componentDidMount () {
    this.loadCampaign()
  }

  loadCampaign () {
    setTimeout(
      () => this.setState({ campaign: { title: 'test' } }),
      5000
    )
  }

  render () {
    const { campaign } = this.state
    console.log(campaign)
    console.log(Object.keys(campaign).length)
    console.log(campaign.constructor === Object)
    return (
      <Formik enableReinitialize initialValues={campaign}>
      {({
        errors,
        handleSubmit,
        isSubmitting
      }) => (
        <Form className='col-md-6 col-lg7 pl-0'>
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
        </Form>
      )}
      </Formik>
    )
  }
}
