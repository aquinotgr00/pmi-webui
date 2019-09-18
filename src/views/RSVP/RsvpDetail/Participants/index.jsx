import React, { Component } from 'react'

export default class index extends Component {
  render() {
    return (
      <div className='user-group'>
        <div className='header-user'>
          <label className='mr-md-auto align-self-stretch'>Anggota Grup</label>
          <a href='#' className='user-a' data-toggle='modal' data-target='#modalAnggota'>Tambah Anggota +</a>
        </div>
        <hr />

        <div className='row'>
          <div className='col col-xs-4 pgntn'>Showing 1 to 5 of 24 enteries</div>
            <div className='col col-xs-8 pgntn'>
              <ul className='pagination hidden-xs float-right'>
                <li className='page-item'>
                  <a className='page-link' href='#' aria-label='Previous'>
                    <span aria-hidden='true'>Â«</span>
                    <span className='sr-only'>Previous</span>
                  </a>
                </li>
                <li className='page-item'><a className='page-link' href='#'>1</a></li>
                <li className='page-item'>
                  <a className='page-link' href='#' aria-label='Next'>
                    <span aria-hidden='true'>Â»</span>
                    <span className='sr-only'>Next</span>
                  </a>
                </li>
                <li className='page-item'>of 3</li>
              </ul>
            </div>
        </div>

        <div className='table-responsive'>
          <table className='table table-hover'>
          <thead>
              <tr>
                  <th scope='col'>Nama</th>
                  <th scope='col'>Jenis Anggota</th>
                  <th scope='col'>Unit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                  <td><a href='#' data-toggle='modal' data-target='#exampleModal'>Niken Annisa Putri</a></td>
                  <td>KORPS SUKARELA</td>
                  <td>KSR UNINDRA</td>
              </tr>
              <tr>
                  <td><a href='#' data-toggle='modal' data-target='#exampleModal'>Khairin Nissa</a></td>
                  <td>KORPS SUKARELA</td>
                  <td>KSR UNINDRA</td>
              </tr>
              <tr>
                  <td><a href='#' data-toggle='modal' data-target='#exampleModal'>Desi Fermatasari</a></td>
                  <td>TENAGA SUKARELA</td>
                  <td>MARKAS PMI JAKARTA PUSAT</td>
              </tr>
              <tr>
                  <td><a href='#' data-toggle='modal' data-target='#exampleModal'>Agung Yuniarto</a></td>
                  <td>PALANG MERAH REMAJA</td>
                  <td>SMPN ! CIKINI</td>
              </tr>
              <tr>
                  <td><a href='#' data-toggle='modal' data-target='#exampleModal'>Syamil</a></td>
                  <td>TENAGA SUKARELA</td>
                  <td>MARKAS PMI JAKARTA PUSAT</td>
              </tr>
              <tr>
                  <td><a href='#' data-toggle='modal' data-target='#exampleModal'>Abdi</a></td>
                  <td>TENAGA SUKARELA</td>
                  <td>SDN MENTENG ATAS</td>
              </tr>
              <tr>
                  <td><a href='#' data-toggle='modal' data-target='#exampleModal'>Iksir</a></td>
                  <td>PALANG MERAH REMAJA</td>
                  <td>SMPN ! CIKINI</td>
              </tr>
              <tr>
                  <td><a href='#' data-toggle='modal' data-target='#exampleModal'>Desi Fermatasari</a></td>
                  <td>MULA</td>
                  <td>SDN 01 KENARI</td>
              </tr>
              <tr>
                  <td><a href='#' data-toggle='modal' data-target='#exampleModal'>Dewi muyasaroh</a></td>
                  <td>PALANG MERAH REMAJA</td>
                  <td>SDN 01 KENARI</td>
              </tr>
              <tr>
                  <td><a href='#' data-toggle='modal' data-target='#exampleModal'>Pandu Praja</a></td>
                  <td>PENGURUS</td>
                  <td>MARKAS PMI JAKARTA PUSAT</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    )
  }
}
