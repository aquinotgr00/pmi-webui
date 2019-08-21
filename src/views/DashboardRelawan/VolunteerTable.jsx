import React from 'react'
import { Card, CardHeader, CardBody, Table } from 'reactstrap'

export function VolunteerTable(props) {

    return (
        <>
            <Card>
                <CardHeader className="header-top">
                    <p className="pl-0">Semua Relawan</p>
                </CardHeader>
                <CardBody>
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
                    </Table>
                </CardBody>
            </Card>
        </>
    )
}