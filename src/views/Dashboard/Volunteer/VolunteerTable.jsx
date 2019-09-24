import React from 'react'
import { Table } from 'reactstrap'
import { VolunteerProfileModal } from 'components'
import { genderTranslate } from 'utils/string'

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
                        const { unit, membership, gender, city } = item
                        return (
                            <tr key={key}>
                                <td>{key + 1}</td>
                                <td>
                                    <VolunteerProfileModal
                                        title={item.name}
                                        data={item}
                                        isOpen={props.openModal}
                                        toggle={props.toggleModal}
                                        handleExportPdf={props.exportToPdf}
                                    />
                                </td>
                                <td>{genderTranslate(gender)}</td>
                                <td>{(membership) ? membership.name : '-'}</td>
                                <td>{city}</td>
                                <td>{(unit) ? unit.name : '-'}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </>
    )
}