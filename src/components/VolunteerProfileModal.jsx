import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Card, CardHeader, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

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
    return (
      <div>
        <Link to='#' onClick={this.toggle}>{this.props.title}</Link>
        <Modal size='lg' isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Profil</ModalHeader>
          <ModalBody>
            <Row>
                <Col md="4">
                    <img className="img-fluid img-thumbnail img-profil mb-3" src={volunteer.image} alt="User profile" />
                    <h1>{volunteer.name}</h1>
                    <p>{volunteer.email}</p>
                    <hr />
                    <ul className="list-group">
                        <li className="no-list">
                            <b>No KTA</b>
                            <p className="float-right my-1">-</p>
                        </li>
                        <li className="no-list">
                            <b>Tempat Lahir</b>
                            <p className="float-right my-1">{volunteer.birthplae}</p>
                        </li>
                        <li className="no-list">
                            <b>Umur</b>
                            <p className="float-right my-1">{volunteer.age} Tahun</p>
                        </li>
                        <li className="no-list">
                            <b>Tanggal Lahir</b>
                            <p className="float-right my-1">{volunteer.dob}</p>
                        </li>
                        <li className="no-list">
                            <b>Jenis Kelamin</b>
                            <p className="float-right my-1">{volunteer.gender}</p>
                        </li>
                        <li className="no-list">
                            <b>Agama</b>
                            <p className="float-right my-1">{volunteer.religion}</p>
                        </li>
                        <li className="no-list">
                            <b>No Telepon</b>
                            <p className="float-right my-1">{volunteer.phone}</p>
                        </li>
                        <li className="no-list">
                            <b>Gol Darah</b>
                            <p className="float-right my-1">{volunteer.blood_type}</p>
                        </li>
                        <li className="no-list">
                            <b>Provinsi</b>
                            <p className="float-right my-1">{volunteer.province}</p>
                        </li>
                        <li className="no-list">
                            <b>Kabupaten</b>
                            <p className="float-right my-1">{volunteer.city}</p>
                        </li>
                        <li className="no-list">
                            <b>Kecamatan</b>
                            <p className="float-right my-1">{volunteer.subdistrict}</p>
                        </li>
                        <li className="no-list">
                        <b>Desa</b>
                        <p className="float-right my-1">{volunteer.subdivision}</p>
                    </li>
                    </ul>
                </Col>
                <Col md="8" className="grs-modal">
                    <Card>
                        <CardHeader>Penghargaan</CardHeader>
                        <div className="table-responsive px-3">
                            <Table>
                                <thead>
                                    <tr>
                                        <th scope="col">No</th>
                                        <th scope="col">Penghargaan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {volunteer.achievements.map((data, key) => {
                                        return (
                                            <tr key={key}>
                                                <th>{key+1}</th>
                                                <td>{data.description}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </div>
                    </Card>
                    <Card className="mt-4">
                        <CardHeader>Penugasan</CardHeader>
                        <div className="table-responsive px-3">
                            <Table>
                                <thead>
                                    <tr>
                                        <th scope="col">No</th>
                                        <th scope="col">Penugasan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {volunteer.assignments.map((data, key) => {
                                    return (
                                        <tr key={key}>
                                            <th>{key+1}</th>
                                            <td>{data.description}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                            </Table>
                        </div>
                    </Card>
                    <Card className="mt-4">
                        <CardHeader>Pelatihan</CardHeader>
                        <div className="table-responsive px-3">
                            <Table>
                                <thead>
                                    <tr>
                                        <th scope="col">No</th>
                                        <th scope="col">Pelatihan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {volunteer.trainings.map((data, key) => {
                                    return (
                                        <tr key={key}>
                                            <th>{key+1}</th>
                                            <td>{data.description}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                            </Table>
                        </div>
                    </Card>
                </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Tutup</Button>
            {volunteer.verified === 1
            ? <Button color="success" onClick={() => this.props.handleExportPdf(volunteer.id)}>Cetak</Button>
            : (
              <>
                <Button color='primary'>Terima</Button>
                <Button color='danger'>Tolak</Button>
              </>
            )}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}