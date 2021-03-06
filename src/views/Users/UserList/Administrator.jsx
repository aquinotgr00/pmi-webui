import React, { Component } from 'react'
import { Table, Button } from 'reactstrap'
import { EditActionButton } from 'components/ActionButtons/EditActionButton'
import { Link } from 'react-router-dom'
import ucwords from 'utils/string'

export class Administrator extends Component {

  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props)
  }

  render() {
    const headings = ['Nama', 'Email', 'Posisi', 'Aksi']
    const { data, path } = this.props
    return (
      <Table hover>
        <thead>
          <tr>
            {headings.map((head, key) => <th key={key}>{head}</th>)}
          </tr>
        </thead>
        <tbody>
          {data && data.map((user, key) => {
            const { role } = user
            return (
                <tr key={key}>
                  <td>
                    <Link to={`${path}/${user.id}/edit`}>
                      {ucwords(user.name)}
                    </Link>
                  </td>
                  <td>{user.email}</td>
                  <td>{(role) ? role.name : ''}</td>
                  <td>
                    <EditActionButton
                      path={`${path}/${user.id}/edit`}
                      data={user}
                    />
                    {user.active === 0 &&
                      <Button
                        onClick={this.props.toggleEnable}
                        value={[user.id, user.active]}
                        className='btn btn-table circle-table tutup-table'
                        title='Aktifkan'
                      />
                    }

                    {user.active === 1 &&
                      <Button
                        onClick={this.props.toggleEnable}
                        value={[user.id, user.active]}
                        className='btn btn-table circle-table buka-table'
                        title='Non-aktifkan'
                      />
                    }

                  </td>
                </tr>
            )
          })}
        </tbody>
      </Table>
    )
  }
}
