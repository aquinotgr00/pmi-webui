import React, { Component } from 'react'
import { Table } from 'reactstrap'

class TableUsers extends Component {
    constructor(props) {
        super(props) 
        this.state = { 
            users: [
                { id: 1, name: 'Wasif', age: 21, email: 'wasif@email.com' },
                { id: 2, name: 'Ali', age: 19, email: 'ali@email.com' },
                { id: 3, name: 'Saad', age: 16, email: 'saad@email.com' },
                { id: 4, name: 'Asad', age: 25, email: 'asad@email.com' }
            ]
        }
    }

    renderTableData() {
        return this.state.users.map((user, index) => {
            const { id, name, age, email } = user 
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{age}</td>
                    <td>{email}</td>
                </tr>
            )
        })
    }

    renderTableHeader() {
        let header = Object.keys(this.state.users[0])
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    render() { 
        return (
            <div>
                <Table>
                    <thead>
                        {this.renderTableHeader()}
                    </thead>
                    <tbody>
                        {this.renderTableData()}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default TableUsers