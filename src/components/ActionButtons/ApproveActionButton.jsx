import React from 'react'
import { ActionButton } from './ActionButton'

export class ApproveActionButton extends React.Component {
  constructor(props) {
    super(props)
  
    this.onClick = this.onClick.bind(this)
  }

  onClick() {
    this.props.onClick(this.props.id, {approved:1})
  }
  
  render() {
    return (
      <ActionButton className='setuju-table' onClick={this.onClick} />
    )
  }
}
