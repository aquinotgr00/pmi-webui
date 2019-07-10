import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'reactstrap'
import { login } from 'actions'

class Campaigns extends React.Component {
  render() {
    const {campaign} = this.props.match.params
    
    return (
      <>
        <div>Campaign : {campaign}</div>
        <Button color="danger" onClick={()=>this.props.dispatch(login('coba'))}>Danger!</Button>
      </>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(Campaigns)