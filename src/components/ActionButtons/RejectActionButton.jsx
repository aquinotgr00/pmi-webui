import React from 'react'
import { ActionButton } from './ActionButton'

export class RejectActionButton extends React.Component {
  constructor(props) {
    super(props)
  
    this.onClick = this.onClick.bind(this)
  }

  onClick() {
    this.props.onClick(this.props.id)
  }
  
  render() {
    return (
      <ActionButton className='delete-table' onClick={this.onClick} />
    )
  }
}
