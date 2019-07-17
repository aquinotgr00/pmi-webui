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
      campaign: {}
    }
    this.loadCampaign = this.loadCampaign.bind(this)
  }

  componentDidMount () {
    this.loadCampaign()
  }

  loadCampaign () {
    setTimeout(
      () => this.setState({ campaign: { title: 'test' } }),
      1000
    )
  }

  render () {
    const { campaign } = this.state
    console.log(campaign)
    console.log(Object.keys(campaign).length)
    console.log(campaign.constructor === Object)
    return (
      <>
        { (Object.keys(campaign).length === 0 && campaign.constructor === Object)
          ? <Formik
            initialValues={this.state.campaign}
            onSubmit={values =>
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2))
              }, 500)
            }
            render={({ errors, values }) => {
              console.log(values.title)
              return (
                <Form>
                  <FormGroup>
                    <label htmlFor='title'>Judul</label>
                    {(Object.keys(campaign).length === 0 && campaign.constructor === Object) ? <Field
                      name='title'
                      render={({ field }) => (
                        <Input {...field} id='title' invalid={errors.title !== undefined} />
                      )}
                    />:'tes'}
                    {errors.title !== undefined ? <FormFeedback>{errors.title}</FormFeedback> : ''}
                  </FormGroup>
                  <div>
                    <button type='submit'>Submit</button>
                  </div>
                </Form>
              )
            }}
          /> : null }
      </>
    )
  }
}
