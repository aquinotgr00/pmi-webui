import React, { Component } from 'react'
import { Label } from 'reactstrap'
import Pusher from 'pusher-js'
import { connect } from 'react-redux'
import { getEventActivityApi } from 'services/api'
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

    channel.bind('pusher:subscription_succeeded', function () {
      
    })

    channel.bind('pusher:subscription_error', function (status) {
      console.log(status)
    })

    channel.bind('event.comment', data => {
      const { comment } = data
      console.log(comment)
      this.setState({
        comments:[...this.state.comments,comment]
      })
    })

    this.loadChat()
  }

  addMedia = mediaFile => {
    generatePreviewImgUrl(mediaFile, previewMedia => { 
      this.setState({ previewMedia }) 
    })
  }

  async loadChat(page=1) {
    const { rsvpId } =this.props
    this.setState({ isLoading: true, error: null })
    const chatParams = new URLSearchParams()
    chatParams.append('e', rsvpId)
    chatParams.append('page',page)
    try {
      const response = await getEventActivityApi(chatParams)
      const { status, data } = response.data
      if (status === 'success') {
        const { current_page:currentPage, data:comments } = data
        
        this.setState({ comments:[ ...this.state.comments, ...comments.reverse()], currentPage, isLoading:false })
      } else {
        // TODO : handle error
        this.setState({ isLoading: false })
      }
    } catch (error) {
      // TODO : handle error
      this.setState({ isLoading: false })
    }
  }

  render() {
    const { comments } = this.state
    return (
      <div className='chatting'>
        <Label>Chat Box</Label>
        <div className='chat-box'>
          <div className='chat'>
            { comments.map(comment => {
                const { comment:text, comment_attachment:attachment, media_url:mediaUrl, admin, volunteer,created_at:timestamp } = comment
                const senderName = admin?admin.name:volunteer.name
                return (
                  <ChatBubble
                    avatar={volunteer?volunteer.image_url:null}
                    senderName={senderName}
                    text={text}
                    media={attachment?mediaUrl:null}
                    timestamp={timestamp}
                    key={`${comment.id}`}
                  />
                )
            })}
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