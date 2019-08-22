import React from 'react'
import { Table } from 'reactstrap'

export function VolunteerTable(props) {
    const { data } = props
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
                        const { membership } = unit || {}
                        return (
                            <tr key={key}>
                                <td>{key + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.gender}</td>
                                <td>{item.unit}</td>
                                <td>Kabupaten/Kota</td>
                                <td>Unit</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </>
    )
}