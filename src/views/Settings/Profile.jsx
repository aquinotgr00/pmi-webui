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
                <Row>
                    <Col className='col-md-6 col-lg7 pl-0'>
                        <FormGroup>
                            <Label>Nama Lengkap</Label>
                            <p>{profile.name}</p>
                        </FormGroup>
                        <FormGroup>
                            <Label>Email</Label>
                            <p>{profile.email}</p>
                        </FormGroup>
                        <div className="float-right">
                            <Button onClick={ () => { history.push('/admin') } } >
                                Beranda
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Main >
        )
    }
}
