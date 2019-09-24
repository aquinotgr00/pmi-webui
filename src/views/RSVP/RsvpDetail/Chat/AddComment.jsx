import React, { Component } from 'react'
import { Input, Label } from 'reactstrap'
import { postEventActivityApi } from 'services/api'

export default class AddComment extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      comment:''
    }
  }

  handleComment = event => {
    this.setState({ comment: event.target.value })
  }
  
  sendMessage = async e => {
    if(e.key==='Enter') {
      e.preventDefault()
      try {
        const event_report_id = this.props.rsvpId
        const { comment } = this.state
        const response = await postEventActivityApi({event_report_id,comment})
        const { status, data } = response.data
        if(status==='success') {
          this.setState({comment:''})
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  render() {
    return (
      <div className='chat-input'>
        <div className='input-bubble'>
          <Input name='image' type='file' id='media-input'
            className='hidden-file-input'
            onChange={event => {
              const file = event.target.files[0]

              if (file) {
                this.props.onAddMedia(file)
              }
            }}
          />
          <Label htmlFor='media-input' className='add-img-red my-auto' />
          <div className='input-group input-chat'>
            <Input
              className='form-control input-box'
              placeholder='Tulis Sesuatu'
              onKeyPress={this.sendMessage}
              onChange={this.handleComment}
              value={this.state.comment}
            />
          </div>
        </div>
      </div>
    )
  }
}
