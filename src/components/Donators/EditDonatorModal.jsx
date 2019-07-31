import React from 'react'
import { Modal, ModalBody, ModalHeader, ModalFooter, FormGroup, FormFeedback, Label, Input, Button } from 'reactstrap'
import { Formik, Form, Field } from 'formik'
import UpdateDonatorSchema from 'validators/updateDonator'


export function EditDonatorModal(props) {
  const { donatorId } = props
  return (
    <>
      <Modal isOpen={props.donatorOpen}>
        <ModalHeader>
          <Label>Edit Donatur</Label>
        </ModalHeader>
        <ModalBody>
          <Formik
            enableReinitialize
            initialValues={props.initialValues}
            validationSchema={UpdateDonatorSchema}
            onSubmit={(values, { setSubmitting }) => {
              props.handleUpdateDonator(donatorId, values)
              setSubmitting(false)
            }} >
            {({
              errors,
              handleSubmit,
              isSubmitting
            }) => (
                <Form onSubmit={handleSubmit} >
                  <FormGroup>
                    <Label>Nama Lengkap</Label>
                    <Field
                      name="name"
                      render={({ field }) => (
                        <Input {...field}
                          type="text"
                          invalid={errors.name !== undefined}
                        />
                      )} />
                    {errors.name !== undefined ? <FormFeedback>{errors.name}</FormFeedback> : ''}
                  </FormGroup>


                  <FormGroup>
                    <Label>Alamat</Label>
                    <Field
                      name="address"
                      render={({ field }) => (
                        <Input {...field}
                          type="textarea"
                          invalid={errors.address !== undefined}
                        />
                      )} />
                    {errors.address !== undefined ? <FormFeedback>{errors.address}</FormFeedback> : ''}
                  </FormGroup>

                  <FormGroup>
                    <Label>Kode Pos</Label>
                    <Field
                      name="postal_code"
                      render={({ field }) => (
                        <Input {...field}
                          type="number"
                          invalid={errors.postal_code !== undefined}
                        />
                      )} />
                    {errors.postal_code !== undefined ? <FormFeedback>{errors.postal_code}</FormFeedback> : ''}
                  </FormGroup>

                  <FormGroup>
                    <Label>No. Tlp</Label>
                    <Field
                      name="phone"
                      render={({ field }) => (
                        <Input {...field}
                          type="number"
                          invalid={errors.phone !== undefined}
                        />
                      )} />
                    {errors.phone !== undefined ? <FormFeedback>{errors.phone}</FormFeedback> : ''}
                  </FormGroup>

                  <FormGroup>
                    <Label>Email</Label>
                    <Field
                      name="email"
                      render={({ field }) => (
                        <Input {...field}
                          type="email"
                          invalid={errors.email !== undefined}
                        />
                      )} />
                    {errors.email !== undefined ? <FormFeedback>{errors.email}</FormFeedback> : ''}
                  </FormGroup>

                  <div className='float-right'>
                    <Button type='button' onClick={props.toggleEditDonator} id="btn-cancel">Batal</Button>
                    <Button type='submit' color='success' disabled={isSubmitting}>Simpan</Button>
                  </div>
                </Form>
              )}
          </Formik>
        </ModalBody>
        <ModalFooter>
        </ModalFooter>
      </Modal>
    </>
  )
}