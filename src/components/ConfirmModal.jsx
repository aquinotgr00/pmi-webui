import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

export function ConfirmModal(props) {
  return (
    <Modal isOpen={props.isOpen} toggle={props.toggle}>
      <ModalHeader toggle={props.toggle}>{props.labelTitle}</ModalHeader>
      <ModalBody>
        {props.labelContent}
      </ModalBody>
      <ModalFooter>
        <Button color='secondary' onClick={props.toggle}>Cancel</Button>{' '}
        <Button color='danger' onClick={props.onAction}>{props.labelAction}</Button>
      </ModalFooter>
    </Modal>
  )
}
