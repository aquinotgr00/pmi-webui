import React, { Component } from 'react'
import moment from 'moment'

export default class Bubble extends Component {
  render() {
    return (
      <div className='chat-bubble'>
        <div className='row'>
          <div className='col-md-2'>
            <img src={this.props.volunteerImage} className='img-circle' />
          </div>
          <div className='col-md'>
            <div className='card bubble-card'>
              <div className='bubble-head'>
                <h2 className='mr-md-auto align-self-stretch'>{this.props.volunteerName}</h2>
                <small>{moment(this.props.commentTime).format('HH:mm')}</small>
              </div>
              {this.props.media &&
                <span className='a-img-bubble'>
                  <img src='images/donasi-images/01.jpg' className='img-inside-bubble' />
                </span>
              }
              <p>{this.props.comment}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
