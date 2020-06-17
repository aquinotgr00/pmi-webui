import React from 'react'
import { ActionButton } from './ActionButton'

export class ArchiveActionButton extends React.Component {
  constructor(props) {
    super(props)
  
    this.onClick = this.onClick.bind(this)
  }

  onClick() {
    this.props.onClick(this.props.id, {archived:1})
  }
  
  render() {
    return (
      <ActionButton className='buka-table' onClick={this.onClick} />
    )
  }
}
