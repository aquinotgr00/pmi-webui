import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Col, Label, Row } from 'reactstrap'
import { Main } from 'components'
import { getRsvpApi, updateRsvpApi } from 'services/api'
import { Form } from 'formik'
import moment from 'moment'
import RsvpField from './RsvpField'
import Chatbox from './Chat/Chatbox'
import Participants from './Participants'

class RsvpDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading:false,
      error:null,
      rsvp: {
        title: '',
        description: '',
        village_id:''
      }
    }
  }

  componentDidMount() {
    const { rsvpId } = this.props.match.params
    this.loadRsvp(rsvpId)
  }
  
  async loadRsvp (rsvpId) {
    this.setState({ isLoading: true, error: null })

    try {
      const response = await getRsvpApi(rsvpId)
      const { status } = response.data
      if (status === 'success') {
        const { data: rsvp } = response.data
        const previewImgUrl = rsvp.image?rsvp.image_url:require('assets/images/image-plus.svg')
        this.setState({
          isLoading: false,
          rsvp,
          previewImgUrl
        })
      } else {
        // TODO : handle error
        this.setState({ isLoading: false, error: null })
      }
    } catch (error) {
      // TODO : handle error
    }
  }
  
  render() {
    const { viewMode } = this.props.match.params
    const { isLoading, rsvp } = this.state
    
    return (
      <Main title={rsvp.title} back isLoading={isLoading}>
        <Row className='pl-3'>
          <Form className='col-md-6 col-lg-6 pl-0'>
            <RsvpField label='Deskripsi' value={rsvp.description} valueClassName='mb-5' />
            <Row className='mb-4'>
              <RsvpField label='Tanggal Buat' className='col-sm' value={rsvp.id===1?'-':moment(rsvp.created_at).format('DD-MM-YYYY') } />
              <RsvpField label='Lokasi' className='col-sm' value={rsvp.village_id?rsvp.village.subdistrict.city.name.toUpperCase():'-'} />
              <RsvpField label='Jumlah Anggota' className='col-sm' value={rsvp.participants?rsvp.participants.length:0} />
            </Row>
            { rsvp.id && <Chatbox rsvpId={rsvp.id} readOnly={viewMode==='archive'} /> }
          </Form>
          <Col md={6} lg={6} className='grs mx-0'>
            <div className="mb-4">
              <Label>Gambar Utama</Label>
              <div className="mb-2 hovereffect">
                <img className="img-fluid img-thumbnail img-featured-size" src={rsvp.image_url} alt="" />
                <div className="overlay btn-img">
                  <span>
                    <a href="#" className="btn btn-table circle-table view-img mr-2" data-toggle="tooltip" data-placement="top" title="" data-original-title="Lihat Gambar"></a>
                  </span>
                  <span data-toggle="modal" role="button" data-target="#ModalMediaLibrary">
                    <a href="#" className="btn btn-table circle-table edit-table" data-toggle="tooltip" data-placement="top" title="" data-original-title="Ubah Gambar"></a>
                  </span>
                </div>
              </div>
              <small>
                <span>Image size must be 1920x600 with maximum file size</span>
                <span>400 kb</span>
              </small>
            </div>

            { rsvp.id && <Participants ableToAdd={rsvp.id!==1 && viewMode!=='archive'} rsvpId={rsvp.id} /> }
            
          </Col>
        </Row>
      </Main>
    )
  }
}

export default withRouter(RsvpDetail)