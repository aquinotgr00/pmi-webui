import React from 'react'
import {
    Modal,
    ModalBody,
    ModalFooter,
    Row,
    Col,
    Card,
    Table,
    Button
} from 'reactstrap'

export function VolunteerModal(props) {
    const { volunteer } = props
    const { user } = volunteer
    
    return (
        <>
            <Modal isOpen={props.openModal} toggle={() => props.toggleModal(0)} className="modal-lg">
                <div className="modal-header">
                    <h1 className="modal-title">
                        Profil
                    </h1>
                    <button type="button" className="close" onClick={() => props.toggleModal(0)}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <ModalBody>
                    <Row>
                        <Col md="4">
                            <img className="img-fluid img-thumbnail img-profil mb-3" src={volunteer.image} alt="User profile picture" />
                            <h1>{ volunteer.name }</h1>
                            <p>{(user.email) && user.email }</p>
                            <hr />
                            <ul className="list-group">
                                <li className="no-list">
                                    <b>No KTA</b>
                                    <p className="float-right my-1">-</p>
                                </li>
                                <li className="no-list">
                                    <b>Tempat Lahir</b>
                                    <p className="float-right my-1">{volunteer.birthplace}</p>
                                </li>
                                <li className="no-list">
                                    <b>Umur</b>
                                    <p className="float-right my-1">{volunteer.age}</p>
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
                                <div className="card-header">Penghargaan</div>
                                <Table className="table-responsive px-3">
                                    <thead>
                                        <tr>
                                            <th scope="col">No</th>
                                            <th scope="col">Penghargaan</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { Object.values(volunteer.achievements).map((achievement, key) => {
                                            key++
                                            return (
                                                <tr key={key}>
                                                    <th>
                                                        {key}
                                                    </th>
                                                    <td>
                                                        {achievement.description}
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </Table>
                            </Card>
                            <Card className="mt-4">
                                <div className="card-header">Penugasan</div>
                                <div className="table-responsive px-3">
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th scope="col">No</th>
                                                <th scope="col">Penugasan</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { Object.values(volunteer.assignments).map((assign, key) => {
                                                key++
                                                return (
                                                    <tr key={key}>
                                                        <th>
                                                            {key}
                                                        </th>
                                                        <td>
                                                            {assign.description}
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                            }
                                        </tbody>
                                    </Table>
                                </div>
                            </Card>
                            <Card className="mt-4">
                                <div className="card-header">Pelatihan</div>
                                <div className="table-responsive px-3">
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th scope="col">No</th>
                                                <th scope="col">Pelatihan</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { Object.values(volunteer.trainings).map((training, key) => {
                                                key++
                                                return (
                                                    <tr key={key}>
                                                        <th>
                                                            {key}
                                                        </th>
                                                        <td>
                                                            {training.description}
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                            }
                                        </tbody>
                                    </Table>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" data-dismiss="modal" onClick={() => props.toggleModal(0)}>Tutup</Button>
                    <Button color="success" onClick={() => props.exportToPdf(volunteer.id) }>Cetak</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}