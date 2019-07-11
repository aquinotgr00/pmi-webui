import React, { Component } from 'react'

export default class ResetPassword extends Component {
  render () {
    const { token: resetPasswordToken } = this.props.match.params
    return (
      <h2>Admin Reset Password : { resetPasswordToken }</h2>
    )
  }
}
