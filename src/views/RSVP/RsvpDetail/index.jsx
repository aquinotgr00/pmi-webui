import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Row } from 'reactstrap'
import { Main } from 'components'
import { getRsvpApi, updateRsvpApi } from 'services/api'

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
        <Row className="pl-3">

        </Row>
      </Main>
    )
  }
}

export default withRouter(RsvpDetail)