import React from 'react'

export function ListTable () {
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
              <tr>
                  <th>
                    <a href="detail-donatur.html">Yeni Sefriyani</a>
                  </th>
                  <td>yeni@mail.com</td>
                  <td>082167767556</td>
                  <td>12-03-2019</td>
                  <td>12-03-2019</td>
              </tr>
            </tbody>
          </table>
        </div>
    )
}