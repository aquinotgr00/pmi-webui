import React from 'react'
import { Main, ImageForm } from 'components'
import ucwords from 'utils/string'
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap'

class Donations extends React.Component {
  render () {
    const { donation } = this.props.match.params

    return (
      <Main title={'Form '+ucwords(donation.split('-').join(' '))}>
        <Row className='pl-3'>
          <Form className='col-md-6 pl-0'>
            <FormGroup>
              <Label for='judul'>Tipe Donasi</Label>
              <Input type='select' name='donation_category'>
                <option>Pilih Tipe Donasi</option>
                <option>Umum</option>
                <option>Khusus</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for='judul'>Judul</Label>
              <Input type='select' name='campaign_id'>
                <option>Pilih Judul Donasi</option>
                <option>Donasi 1</option>
                <option>Donasi 2</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for='donator'>Nama Donatur</Label>
              <Input type='text' id='donator' name='donator' />
            </FormGroup>
            <FormGroup>
              <Label for='email'>E-mail</Label>
              <Input type='email' id='email' name='email' />
            </FormGroup>
            <FormGroup>
              <Label for='phone'>No Telepon</Label>
              <Input type='number' id='phone' name='phone' />
            </FormGroup>
            <FormGroup>
              <Label for='amount'>Besar Donasi</Label>
              <Input type='number' id='amount' name='amount' />
            </FormGroup>
            <div className="d-flex flex-row-reverse mt-4">
              <Button type='submit' color='success'>Simpan</Button>
            </div>
          </Form>

          <Col md='4' lg='5' className='pl-5 grs'>
            <ImageForm title='Bukti Penerimaan' />
          </Col>
        </Row>
      </Main>
    )
  }
}

export default Donations
