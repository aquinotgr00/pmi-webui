import React from 'react'

export function ListTable (props) {
  const { donators } = props
    return (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                  <th scope="col">Nama</th>
                  <th scope="col">E-mail</th>
                  <th scope="col">No Tlp</th>
                  <th scope="col">Tanggal Daftar</th>
                  <th scope="col">Waktu Donasi Terakhir</th>
              </tr>
            </thead>
            <tbody>
              {donators.map((donator, key) => {
                return (
                  <tr key={key}>
                    <th>
                      <a href="detail-donatur.html">{donator.name}</a>
                    </th>
                    <td>{donator.user.email}</td>
                    <td>{donator.phone}</td>
                    <td>{donator.created_at}</td>
                    <td>{donator.donations.length > 0 && donator.donations[0].created_at }</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
    )
}