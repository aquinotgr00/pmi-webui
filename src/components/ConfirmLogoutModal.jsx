import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

export function ConfirmLogoutModal (props) {
  return (
    <Modal isOpen={props.isOpen} toggle={props.toggle}>
      <ModalHeader toggle={props.toggle}>Ready to Leave?</ModalHeader>
      <ModalBody>
        Select "Logout" below if you are ready to end your current session.
      </ModalBody>
      <ModalFooter>
        <Button color='secondary' onClick={props.toggle}>Cancel</Button>{' '}
        <Button color='danger' onClick={props.onLogout}>Logout</Button>
      </ModalFooter>
    </Modal>
  )
}
