import React from 'react'
import { Button, FormFeedback, FormGroup, Input, Label, Modal, ModalHeader, ModalBody } from 'reactstrap'
import { Formik, Form, Field, } from 'formik';

export function RejectionModal(props) {
  return (
    <Modal isOpen={props.isOpen} toggle={props.toggle} centered={true}>
      <ModalHeader toggle={props.toggle} tag='h1' >Tolak</ModalHeader>
      <ModalBody>
        <Formik 
          initialValues={props.initialValues}
          validateOnBlur={false}
          validate={values=>{
            let errors={}
            if (!values.rejectionReason) {
              errors.rejectionReason = 'Alasan penolakan wajib diisi';
            }
            return errors
          }}
          onSubmit={props.onSubmit}
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
                <Button onClick={props.toggle} className="btn-outline-secondary" color='none'>Batal</Button>
              </div>
            </Form>
        )} />
      </ModalBody>
    </Modal>
  )
}
