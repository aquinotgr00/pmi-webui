import React, { Component } from 'react'
import { Card, CardBody, CardTitle, FormGroup } from 'reactstrap'
import { DetailsDonationForm } from 'components/Transactions/DetailsDonationForm'
import { InfoDonationForm } from 'components/Transactions/InfoDonationForm'

export class InformationCard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isOpen: false
    }
    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  }

  render() {
    return (
      <>
        <Card className="card-transaction">
          <CardBody>
            <CardTitle className="row">
              <div className="col-md">
                <label>{this.props.title}</label>
              </div>
              <div className="col-md mt-1">
                <button className="btn btn-edit-frm float-right"
                  onClick={this.toggle}
                  data-original-title="Edit Info Donatur"></button>
              </div>
            </CardTitle>
            <hr className="mt-1 mb-1" />
            {this.props.items.map((item, index) => {
              return (
                <FormGroup key={index}>
                  <label>{item.label}</label>
                  <p>{item.text}</p>
                </FormGroup>
              )
            })}
          </CardBody>
        </Card>
        {this.props.index === 1 &&
          <InfoDonationForm
            toggle={this.toggle}
            isOpen={this.state.isOpen}
            items={this.props.items}
            id={this.props.id} data={this.props.data}
            handleSubmitDetails={this.props.handleSubmitDetails}
            handleSubmitInfo={this.props.handleSubmitInfo}
          />
        }
        {this.props.index === 2 &&
          <DetailsDonationForm
            toggle={this.toggle}
            isOpen={this.state.isOpen}
            items={this.props.items}
            id={this.props.id}
            data={this.props.data}
            handleSubmitDetails={this.props.handleSubmitDetails}
            handleSubmitInfo={this.props.handleSubmitInfo}
          />
        }
      </>
    )
  }
}