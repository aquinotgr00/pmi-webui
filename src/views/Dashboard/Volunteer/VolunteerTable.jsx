import React from 'react'
import { Table } from 'reactstrap'
import { VolunteerModal } from './VolunteerModal'

export function VolunteerTable(props) {
    const { data, volunteer } = props
    return (
        <>
            <Table hover>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama</th>
                        <th>Jenis Kelamin</th>
                        <th>Jenis Anggota</th>
                        <th>Kabupaten/Kota</th>
                        <th>Unit</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, key) => {
                        const { unit } = item
                        const { membership } = unit
                        return (
                            <tr key={key}>
                                <td>{key + 1}</td>
                                <td>
                                    <a href="#open-modal" onClick={() => props.toggleModal(item.id)}>{item.name}</a>
                                </td>
                                <td>{item.gender}</td>
                                <td></td>
                                <td>{item.city}</td>
                                <td></td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            {(volunteer.user) &&
                <VolunteerModal
                    exportToPdf={props.exportToPdf}
                    volunteer={volunteer}
                    openModal={props.openModal}
                    toggleModal={props.toggleModal}
                />
            }
        </>
    )
}