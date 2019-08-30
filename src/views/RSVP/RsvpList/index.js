import React, { Component } from 'react'
import { Button, FormFeedback, FormGroup, Input, Label, Modal, ModalHeader, ModalBody } from 'reactstrap'
import { AddNewActionButton, PaginationLink, Tool } from 'components'
import { Active } from './Active'
import { Pending } from './Pending'
import { Archived } from './Archived'
import { updateRsvpApi, listRsvpApi } from 'services/api'
import { Formik, Form, Field, } from 'formik';

export default class RsvpList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchFor: '',
      isLoading: false,
      rsvpData: [],
      error: null,
      currentPage: 1,
      numberOfPages: 0,
      from: 0,
      to: 0,
      numberOfEntries: 0,
      rejectModalIsOpen: false,
      rejectRsvpId: null
    }

    this.loadRsvp = this.loadRsvp.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.toggleTooltip = this.toggleTooltip.bind(this)
    this.renderRsvpList = this.renderRsvpList.bind(this)
    this.goToPage = this.goToPage.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.toggleRejectModal = this.toggleRejectModal.bind(this)
    this.handleReject = this.handleReject.bind(this)
  }

  componentDidMount () {
    this.loadRsvp()
  }

  async loadRsvp (page = 1, searchFor = '') {
    const rsvpListParams = new URLSearchParams()
    const { category } = this.props
    switch (category) {
      case 'arsip':
        rsvpListParams.append('ar', 1)
        break
      case 'moderasi':
        rsvpListParams.append('p', 1)
        break
      default:
        rsvpListParams.append('ap', 1)
    }

    rsvpListParams.append('page', page)

    if (searchFor) {
      rsvpListParams.append('s', searchFor)
    }

    this.setState({ isLoading: true, error: null })

    try {
      const response = await listRsvpApi(rsvpListParams)
      const { status } = response.data
      if (status === 'success') {
        const { data } = response.data
        const { current_page: currentPage, last_page: numberOfPages, data: rsvpData, from, to, total: numberOfEntries } = data
        this.setState({ isLoading: false, rsvpData, currentPage, numberOfPages, from, to, numberOfEntries, searchFor })
        
      } else {
        // TODO : handle error
        this.setState({ isLoading: false, error: null })
      }
    } catch (error) {
      // TODO : handle error
    }
  }

  async handleUpdate(rsvpId, data) {
    this.setState({ isLoading: true, error: null })
    try {
      const response = await updateRsvpApi(rsvpId, data)
      const { status } = response.data
      if (status === 'success') {
        this.setState({ isLoading: false, error: null })
        const { searchFor, currentPage } = this.state
        this.loadRsvp(currentPage, searchFor)
      } else {
        // TODO : handle error
        this.setState({ isLoading: false, error: null })
      }
    } catch (error) {
      // TODO : handle error
    }
  }

  handleSearch (event) {
    const searchKeyword = event.target.value
    this.loadRsvp(this.state.page, searchKeyword)
  }

  goToPage (page) {
    this.loadRsvp(page, this.state.searchFor)
  }

  toggleTooltip () {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    })
  }

  handleReject(rejectRsvpId) {
    this.setState({rejectModalIsOpen:true, rejectRsvpId});
  }

  toggleRejectModal() {
    this.setState({rejectModalIsOpen:!this.state.rejectModalIsOpen});
  }

  renderRsvpList (category) {
    const { rsvpData, currentPage, numberOfPages, from, to, numberOfEntries } = this.state

    return (
      <>
        <PaginationLink
          rowFrom={from}
          rowTo={to}
          numberOfEntries={numberOfEntries}
          currentPage={currentPage}
          numberOfPages={numberOfPages}
          onPageChange={this.goToPage}
        />
        {(category === 'list-rsvp') && <Active data={rsvpData} onArchive={this.handleUpdate} />}
        {(category === 'moderasi') && <Pending data={rsvpData} onApprove={this.handleUpdate} onReject={this.handleReject} />}
        {(category === 'arsip') && <Archived data={rsvpData} />}
      </>
    )
  }

  render () {
    const { category } = this.props
    const { error } = this.state
    return (
      <>
        <Tool onSearch={this.handleSearch}>
          {category === 'list-rsvp' && <AddNewActionButton path='buat-rsvp' /> }
        </Tool>
        {error
          ? <div>Error</div>
          : this.renderRsvpList(category)
        }
        <Modal isOpen={this.state.rejectModalIsOpen} toggle={this.toggleRejectModal} centered={true}>
          <ModalHeader toggle={this.toggleRejectModal} tag='h1' >Tolak</ModalHeader>
          <ModalBody>
            <Formik 
              initialValues={{approved:0, rejectionReason:'', rsvpId:this.state.rejectRsvpId}}
              validateOnBlur={false}
              validate={values=>{
                let errors={}
                if (!values.rejectionReason) {
                  errors.rejectionReason = 'Alasan penolakan wajib diisi';
                }
                return errors
              }}
              onSubmit={(values, { setSubmitting }) => {
                const {approved, rejectionReason:reason_rejection, rsvpId} = values
                this.handleUpdate(rsvpId, {approved,reason_rejection})
                setSubmitting(false)
                this.toggleRejectModal()
              }}
              render={({
                errors,
                handleSubmit,
                isSubmitting
              }) => (
                <Form>
                  <FormGroup>
                    <Label htmlFor="rejectionReason">Alasan</Label>
                    <Field
                      name='rejectionReason'
                      render={({ field }) => (
                        <Input 
                          {...field}
                          type="textarea" 
                          id="rejectionReason" 
                          rows="3"
                          maxLength={255}
                          invalid={errors.rejectionReason!==undefined}
                        />
                      )}
                    />
                    {errors.rejectionReason ? <FormFeedback>{errors.rejectionReason}</FormFeedback> : ''}
                  </FormGroup>
                  <div className="d-flex flex-row-reverse">
                    <Button
                      disabled={isSubmitting}
                      onClick={() => {
                        handleSubmit()
                      }}
                      className="ml-4"
                      color='success'>Kirim
                    </Button>
                    <Button onClick={this.toggleRejectModal} className="btn-outline-secondary" color='none'>Batal</Button>
                  </div>
                </Form>
            )} />
          </ModalBody>
        </Modal>
      </>
    )
  }
}
