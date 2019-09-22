import React, { Component } from 'react'
import { PaginationLink } from 'components/PaginationLink'

export default class index extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      currentPage: 1,
      numberOfPages: 3,
      from: 1,
      to: 5,
      numberOfEntries: 24,
    }

    this.goToPage = this.goToPage.bind(this)
  }

  componentDidMount() {
    this.loadParticipants(1)
  }

  loadParticipants(page) {

  }
  
  goToPage (page) {
    this.loadParticipants(page)
  }
  
  render() {
    const { currentPage, numberOfPages, from, to, numberOfEntries } = this.state
    return (
      <div className='user-group'>
        <div className='header-user'>
          <label className='mr-md-auto align-self-stretch'>Anggota Grup</label>
          {this.props.ableToAdd && 
            <a href='#' className='user-a' data-toggle='modal' data-target='#modalAnggota'>Tambah Anggota +</a>
          }
        </div>
        <hr />

        <PaginationLink
          rowFrom={from}
          rowTo={to}
          numberOfEntries={numberOfEntries}
          currentPage={currentPage}
          numberOfPages={numberOfPages}
          onPageChange={this.goToPage}
        />

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
