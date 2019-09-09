import React from 'react'
import { Label, Input, Button, Modal, ModalHeader, ModalBody, FormGroup } from 'reactstrap'

export class RejectModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rejectModal: false,
      volunteerId: this.props,
      description: ''
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      rejectModal: !prevState.rejectModal
    }));
  }

  handleSubmit (values) {
    this.props.handleApprove(this.props.volunteerId, values)
  }

  render() {
    return (
      <>
        <Button onClick={this.toggle} className='btn btn-table circle-table delete-table' />
        <Modal isOpen={this.state.rejectModal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Tolak</ModalHeader>
          <ModalBody className='container'>
            <FormGroup>
              <Label for="exampleInputCategoryRelatedTag">Alasan</Label>
              <Input type="textarea" value={this.state.description} onChange={e => this.setState({description: e.target.value})} name="description" className="form-control" id="exampleFormControlTextarea1" rows="3" />
            </FormGroup>
            <div className="d-flex flex-row-reverse">
              <Button onClick={() => {
                  this.toggle()
                  this.setState({ description:'' })
                  this.props.handleApprove(this.props.volunteerId, {verified: 0, description: this.state.description}, this.props.key)
                }} className="ml-4" color='success'>Kirim</Button>
              <Button onClick={this.toggle} className="btn-outline-secondary">Batal</Button>
            </div>
          </ModalBody>
        </Modal>
      </>
    );
  }
}