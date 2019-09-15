import React, { Component } from 'react'
import { Button, Input, Label } from 'reactstrap'


export default class AddComment extends Component {

  sendMessage = async e => {
    if(e.key==='Enter') {
      e.preventDefault()
      try {
        console.log(e.target.value)
        // const response = await this.sendCommentApi()
      } catch (error) {
        
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
            <input type='text' className='form-control input-box' placeholder='Tulis Sesuatu' onKeyPress={this.sendMessage} />
          </div>
        </div>
      </div>
    )
  }
}
