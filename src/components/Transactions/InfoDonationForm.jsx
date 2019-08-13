import React from 'react'
import { FormGroup, Input, Button, FormFeedback, Modal, ModalHeader, ModalBody } from 'reactstrap'
import { Formik, Form, Field } from 'formik'
import infoDonationSchema from 'validators/infoDonation'

export function InfoDonationForm(props) {
  
  const { name, phone, email } = props.data || {}
  const { address } = props.data.donator || {}
  let initialValues = { name, address, phone, email }
  
  return (
    <Modal isOpen={props.isOpen} toggle={props.toggle}>
      <ModalHeader>
        <div className="modal-title">Edit Info Donatur</div>
      </ModalHeader>
      <ModalBody className="container">

        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={infoDonationSchema}
          onSubmit={(values, { setSubmitting }) => {
            props.handleSubmitInfo(props.id, values)
            setSubmitting(false)
          }}
        >
          {({
            errors,
            handleSubmit,
            isSubmitting
          }) => (
              <Form onSubmit={handleSubmit}>

                <FormGroup>
                  <label htmlFor="name">Nama</label>
                  <Field
                    name="name"
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="text" id="name"
                        invalid={errors.name !== undefined} />
                    )} />

                  {errors.name !== undefined ? <FormFeedback>{errors.name}</FormFeedback> : ''}
                </FormGroup>

                <FormGroup>
                  <label htmlFor="address">Alamat</label>
                  <Field
                    name="address"
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="textarea" id="address"
                        invalid={errors.address !== undefined} />
                    )} />

                  {errors.address !== undefined ? <FormFeedback>{errors.address}</FormFeedback> : ''}
                </FormGroup>

                <FormGroup>
                  <label htmlFor="phone">No.Telp</label>
                  <Field
                    name="phone"
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="text" id="phone"
                        invalid={errors.phone !== undefined} />
                    )} />

                  {errors.phone !== undefined ? <FormFeedback>{errors.phone}</FormFeedback> : ''}
                </FormGroup>

                <FormGroup>
                  <label htmlFor="email">Email</label>
                  <Field
                    name="email"
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="email" id="email"
                        invalid={errors.email !== undefined} />
                    )} />

                  {errors.email !== undefined ? <FormFeedback>{errors.email}</FormFeedback> : ''}
                </FormGroup>

                <div className='float-right'>
                  <Button type='button' color='secondary' onClick={props.toggle} id="btn-cancel">Batal</Button>
                  <Button type='submit' color='success' disabled={isSubmitting}>Simpan</Button>
                </div>
              </Form>
            )}

        </Formik>

      </ModalBody>
    </Modal>
  )
}