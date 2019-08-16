import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export class VolunteerProfileModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      volunteer: this.props.data,
      qualification_key: 1
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    const { volunteer } = this.state
    console.log(volunteer)
    return (
      <div>
        <Link onClick={this.toggle}>{this.props.title}</Link>
        <Modal size='lg' isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Profil</ModalHeader>
          <ModalBody>
            <div class="modal-body">
                <div class="row">
                <div class="col-md-4">
                    <img className="img-fluid img-thumbnail img-profil mb-3" src={volunteer.image} alt="User profile picture" />
                    <h1>{volunteer.name}</h1>
                    <p>{volunteer.email}</p>
                    <hr />
                    <ul class="list-group">
                    <li class="no-list">
                        <b>No KTA</b>
                        <p class="float-right my-1">-</p>
                    </li>
                    <li class="no-list">
                        <b>Tempat Lahir</b>
                        <p class="float-right my-1">{volunteer.birthplae}</p>
                    </li>
                    <li class="no-list">
                        <b>Umur</b>
                        <p class="float-right my-1">{volunteer.age} Tahun</p>
                    </li>
                    <li class="no-list">
                        <b>Tanggal Lahir</b>
                        <p class="float-right my-1">{volunteer.dob}</p>
                    </li>
                    <li class="no-list">
                        <b>Jenis Kelamin</b>
                        <p class="float-right my-1">{volunteer.gender}</p>
                    </li>
                    <li class="no-list">
                        <b>Agama</b>
                        <p class="float-right my-1">{volunteer.religion}</p>
                    </li>
                    <li class="no-list">
                        <b>No Telepon</b>
                        <p class="float-right my-1">{volunteer.phone}</p>
                    </li>
                    <li class="no-list">
                        <b>Gol Darah</b>
                        <p class="float-right my-1">{volunteer.blood_type}</p>
                    </li>
                    <li class="no-list">
                        <b>Provinsi</b>
                        <p class="float-right my-1">{volunteer.province}</p>
                    </li>
                    <li class="no-list">
                        <b>Kabupaten</b>
                        <p class="float-right my-1">{volunteer.city}</p>
                    </li>
                    <li class="no-list">
                        <b>Kecamatan</b>
                        <p class="float-right my-1">{volunteer.subdistrict}</p>
                    </li>
                    <li class="no-list">
                        <b>Desa</b>
                        <p class="float-right my-1">{volunteer.subdivision}</p>
                    </li>
                    </ul>
                </div>
                <div class="col-md-8 grs-modal">
                    <div class="card">
                        <div class="card-header">Penghargaan</div>
                        <div class="table-responsive px-3">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Penghargaan</th>
                                </tr>
                            </thead>
                            <tbody>
                                {volunteer.qualifications.filter(data => data.category === 1).map((data, key) => {
                                    return (
                                        <tr>
                                            <th>{key+1}</th>
                                            <td>{data.description}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="card mt-4">
                        <div class="card-header">Penugasan</div>
                        <div class="table-responsive px-3">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Penugasan</th>
                                </tr>
                            </thead>
                            <tbody>
                                {volunteer.qualifications.filter(data => data.category === 2).map((data, key) => {
                                    return (
                                        <tr>
                                            <th>{key+1}</th>
                                            <td>{data.description}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="card mt-4">
                        <div class="card-header">Pelatihan</div>
                        <div class="table-responsive px-3">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Pelatihan</th>
                                </tr>
                            </thead>
                            <tbody>
                                {volunteer.qualifications.filter(data => data.category === 3).map((data, key) => {
                                    return (
                                        <tr>
                                            <th>{key+1}</th>
                                            <td>{data.description}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}