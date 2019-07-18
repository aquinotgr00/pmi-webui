import React, { Component } from 'react'
import { DropdownItem, Input } from 'reactstrap'

export default class FilterDropdownItem extends Component {
  constructor (props) {
    super(props)

    this.handleTick = this.handleTick.bind(this)
  }

  handleTick (event) {
    const { selected } = this.props
    const { value, checked } = event.target
    let ticked = null

    if (!checked) {
      if (selected === null || selected === undefined) {
        ticked = (value === '1') ? '0' : '1'
      }
    }

    this.props.onSelect(ticked)
  }

  render () {
    const { selected } = this.props
    const trueIsChecked = (selected === undefined) || (selected === null) || (selected === '1')
    const falseIsChecked = (selected === undefined) || (selected === null) || (selected === '0')
    return (
    <>
      {this.props.divider && <DropdownItem divider />}
      <DropdownItem className='d-flex' tag='span'>
        <Input type='checkbox' className='align-self-center' value={1} checked={trueIsChecked} onChange={this.handleTick} />{this.props.trueItem}
      </DropdownItem>
      <DropdownItem className='d-flex' tag='span'>
        <Input type='checkbox' className='align-self-center' value={0} checked={falseIsChecked} onChange={this.handleTick} />{this.props.falseItem}
      </DropdownItem>
    </>
    )
  }
}
