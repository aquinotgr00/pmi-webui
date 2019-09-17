import React, { Component } from 'react'
import { Main } from 'components'
import { Row, Col, FormGroup, Label, Button } from 'reactstrap'
import { store } from '../../store'

export default class Profile extends Component {
    render() {
        const { profile } = store.getState().user
        const { history } = this.props
        return (
            <Main title='Pengaturan Profile' >
                <Row >
                    <Col md="3">
                        <img src="//placehold.it/350" className="img-fluid img-thumbnail img-kwitansi-size" alt="avatar" />
                    </Col>
                    <Col md="9">
                        <FormGroup>
                            <Label>Nama Lengkap</Label>
                            <p>{profile.name}</p>
                        </FormGroup>
                        <FormGroup>
                            <Label>Email</Label>
                            <p>{profile.email}</p>
                        </FormGroup>
                        <Button onClick={() => { history.push('/admin') }} >Batal</Button>
                    </Col>
                </Row>
            </Main >
        )
    }
}
