import React, { Component } from 'react'
import { withRouter } from 'react-router'

class RsvpDetail extends Component {
  constructor(props) {
    super(props)
  
    const { rsvpId, viewMode } = this.props.match.params
    console.log(rsvpId, viewMode)
  }
  
  render() {
    return (
      <div>
        Detail
      </div>
    )
  }
}

export default withRouter(RsvpDetail)