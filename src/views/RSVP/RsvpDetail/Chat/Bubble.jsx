import React, { Component } from 'react'
import moment from 'moment'
import adminIcon from 'assets/images/admin.png'
export default class Bubble extends Component {
  render() {
    const {avatar, senderName, text, media, timestamp} = this.props
    const senderImg = avatar || adminIcon
    return (
      <div className='chat-bubble'>
        <div className='row'>
          <div className='col-md-2'>
            <img src={senderImg} className='img-circle' alt='' />
          </div>
          <div className='col-md'>
            <div className='card bubble-card'>
              <div className='bubble-head'>
                <h2 className='mr-md-auto align-self-stretch'>{senderName}</h2>
                <small>{moment(timestamp).format('HH:mm')}</small>
              </div>
              {media &&
                <span className='a-img-bubble'>
                  <img src={media} className='img-inside-bubble' alt='' />
                </span>
              }
              <p>{text}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
