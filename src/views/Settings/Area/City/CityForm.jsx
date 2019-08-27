import React from 'react'
import { FormFeedback, FormGroup, Label, Input, Button, Row, Col } from 'reactstrap'
import { Formik, Form, Field } from 'formik'

export function CityForm(props) {
    
    let initialValues = {
        province_id:6,
        name:"",
        postal_code:""
    }
    
    if (props.data.id) {
        initialValues = props.data    
    }
    return (
        <>
            <Row>
                <Col md="5">
                    <Formik
                        enableReinitialize
                        validationSchema={props.validationSchema}
                        initialValues={initialValues}
                        onSubmit={(values, { setSubmitting }) => {
                            if (typeof props.areaId === "undefined") {
                                props.handleSaveArea(values)
                            } else {
                                props.handleUpdateArea(props.areaId, values)
                            }
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
                                <Form onSubmit={handleSubmit}>
                                    <FormGroup>
                                        <Label>Kabupaten/Kota</Label>
                                        <Field
                                            name='name'
                                            render={({ field }) => (
                                                <Input {...field} id='name' maxLength={255} invalid={errors.name !== undefined} />
                                            )}
                                        />
                                        {errors.name !== undefined ? <FormFeedback>{errors.name}</FormFeedback> : ''}
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Kode Pos</Label>
                                        <Field
                                            name='postal_code'
                                            render={({ field }) => (
                                                <Input {...field} id='postal_code' maxLength={10} invalid={errors.postal_code !== undefined} />
                                            )}
                                        />
                                        {errors.postal_code !== undefined ? <FormFeedback>{errors.postal_code}</FormFeedback> : ''}
                                    </FormGroup>
                                    <FormGroup>
                                        <div className="float-right">
                                            <Button
                                                type="submit"
                                                disabled={isSubmitting}
                                                color="success">Simpan</Button>
                                        </div>
                                    </FormGroup>
                                </Form>
                            )}
                    </Formik>
                </Col>
                <Col md="5" />
            </Row>
        </>
    )
} 