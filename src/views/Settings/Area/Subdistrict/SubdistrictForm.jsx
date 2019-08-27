import React from 'react'
import { FormFeedback, FormGroup, Label, Input, Button, Row, Col } from 'reactstrap'
import { Formik, Form, Field } from 'formik'


export function SubdistrictForm(props) {
    let initialValues = {
        city_id: 0,
        name: ""
    }
    let selection = props.data
    if (props.data.selection) {
        selection = props.data.selection
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
                                            name='city_id'
                                            render={({ field }) => (
                                                <Input type="select" {...field} id='city_id' invalid={errors.city_id !== undefined} >
                                                    <option value="0">Pilih Kabupaten/Kota</option>
                                                    { selection.map((option,index) => {
                                                        return (
                                                            <option value={option.id}>{option.name}</option>
                                                        )
                                                    }) }
                                                </Input>
                                            )}
                                        />
                                        {errors.city_id !== undefined ? <FormFeedback>{errors.city_id}</FormFeedback> : ''}
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Kecamatan</Label>
                                        <Field
                                            name='name'
                                            render={({ field }) => (
                                                <Input {...field} id='name' maxLength={255} invalid={errors.name !== undefined} />
                                            )}
                                        />
                                        {errors.name !== undefined ? <FormFeedback>{errors.name}</FormFeedback> : ''}
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