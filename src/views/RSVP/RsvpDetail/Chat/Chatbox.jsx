import React, { Component } from 'react'
import { Button, Label } from 'reactstrap'
import Pusher from 'pusher-js'
import { connect } from 'react-redux'
import AddNewComment from './AddComment'
import ChatBubble from './Bubble'

if(process.env.NODE_ENV !== 'production') {
  Pusher.logToConsole = true
}

function generatePreviewImgUrl (file, callback) {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onloadend = e => callback(reader.result)
}

class Chatbox extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      isLoading:false,
      comments:[],
      error:null,
      previewMedia:null
    }
  }
  
  componentDidMount() {
    const { user,rsvpId } =this.props
    const pusher = new Pusher('cd715e34f34f279b12d9', {
      authEndpoint: `${process.env.REACT_APP_API_URL.slice(0,-4)}/broadcasting/auth`,
      auth: {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      },
      cluster: 'ap1',
      forceTLS: true
    })
    const channel = pusher.subscribe(`private-event.${rsvpId}`)

    channel.bind('pusher:subscription_error', function (status) {
      console.log(status)
    })

    channel.bind('event.comment', function (data) {
      console.log(data)
    })
  }

  addMedia = mediaFile => {
    generatePreviewImgUrl(mediaFile, previewMedia => { 
      this.setState({ previewMedia }) 
    })
  }
  
  render() {
    const { comments } = this.state
    return (
      <div className='chatting'>
        <Label>Chat Box</Label>
        <div className='chat-box'>
          <div className='chat'>
            { comments.map(comment=>
                <ChatBubble
                  avatar={comment.user.image_url}
                  commentatorName={comment.name}
                  media={comment.attachment}
                  key={`${comment.id}`}
                />
              )
            }
            <div className='chat-bubble'>
              <div className='row'>
                <div className='col-md-2'>
                  <img src='images/donasi-images/profil.png' className='img-circle' />
                </div>
                <div className='col-md'>
                  <div className='card bubble-card'>
                    <div className='bubble-head'>
                      <h2 className='mr-md-auto align-self-stretch'>Niken Anisa Putri</h2>
                      <small>3:16 PM</small>
                    </div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className='chat-bubble'>
              <div className='row'>
                <div className='col-md-2'>
                  <img src='images/donasi-images/profil.png' className='img-circle' />
                </div>
                <div className='col-md'>
                  <div className='card bubble-card'>
                    <div className='bubble-head'>
                      <h2 className='mr-md-auto align-self-stretch'>Niken Anisa Putri</h2>
                      <small>3:16 PM</small>
                    </div>
                    <a href='#' className='a-img-bubble'>
                      <img src='images/donasi-images/01.jpg' className='img-inside-bubble' />
                    </a>
                    <p>Lorem ipsum dolor sit amet</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className='chat-bubble'>
              <div className='row'>
                <div className='col-md-2'>
                  <img src='images/donasi-images/profil.png' className='img-circle' />
                </div>
                <div className='col-md'>
                  <div className='card bubble-card'>
                    <div className='bubble-head'>
                      <h2 className='mr-md-auto align-self-stretch'>Niken Anisa Putri</h2>
                      <small>3:16 PM</small>
                    </div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className='chat-bubble'>
              <div className='row'>
                <div className='col-md-2'>
                  <img src='images/donasi-images/profil.png' className='img-circle' />
                </div>
                <div className='col-md'>
                  <div className='card bubble-card'>
                    <div className='bubble-head'>
                      <h2 className='mr-md-auto align-self-stretch'>Niken Anisa Putri</h2>
                      <small>3:16 PM</small>
                    </div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {!this.props.readOnly && 
            <AddNewComment
              rsvpId={this.props.rsvpId}
              onAddMedia={this.addMedia}
            />
          }
          
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  user: state.user
}))(Chatbox)