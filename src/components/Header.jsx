import React from 'react'
import { connect } from 'react-redux'
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap'
import { showConfirmLogout } from 'actions'

function Header(props) {
  return (
    <>
      <header className="navbar navbar-expand-lg navbar-light pl-0 pt-4">
        <div className="mr-md-auto align-self-stretch">
          {(props.back) && <a href={props.back} className="btn-table btn-back back-head mt-1" title="kembali"></a>}
          <div className="mr-md-auto align-self-stretch">
            <h1>{props.title}</h1>
          </div>
        </div>
        <div className="dropdown mr-3">
          <button type="button" className="btn btn-notif" id="NotifDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span className="badge">99+</span>
          </button>
          <ul className="dropdown-menu dropdown-menu-right px-2 notify-drop" aria-labelledby="NotifDropdown">
            <div className="notify-drop-title">
              <h2>Notifikasi</h2>
              <hr />
            </div>
            <div className="drop-content">
              <li>
                <a href="#" className="dropdown-item px-2">
                  <p className="notif-text"><b>Niken Annisa Putri</b> meminta persetujuan untuk bergabung dalam event <b>Banjir Wilayah Sunter</b></p>
                  <div className="notif-footer">
                    <div className="mr-md-auto align-self-stretch my-auto">
                      <small>1m yang lalu</small>
                    </div>
                    <div>
                      <button type="button" className="btn btn-link btn-link-second">Tolak</button>
                    </div>
                    <div>
                      <button type="button" className="btn btn-link">Setujui</button>
                    </div>
                  </div>
                </a>
              </li>
              <hr />
              <li>
                <a href="#" className="dropdown-item px-2">
                  <p className="notif-text"><b>Niken Annisa Putri</b> meminta persetujuan untuk bergabung dalam event <b>Banjir Wilayah Sunter</b></p>
                  <div className="notif-footer">
                    <div className="mr-md-auto align-self-stretch my-auto">
                      <small>1m yang lalu</small>
                    </div>
                    <div>
                      <button type="button" className="btn btn-link btn-link-second">Tolak</button>
                    </div>
                    <div>
                      <button type="button" className="btn btn-link">Setujui</button>
                    </div>
                  </div>
                </a>
              </li>
              <hr />
              <li>
                <a href="#" className="dropdown-item px-2">
                  <p className="notif-text"><b>Niken Annisa Putri</b> meminta persetujuan untuk bergabung dalam event <b>Banjir Wilayah Sunter</b></p>
                  <div className="notif-footer">
                    <div className="mr-md-auto align-self-stretch my-auto">
                      <small>1m yang lalu</small>
                    </div>
                    <div>
                      <button type="button" className="btn btn-link btn-link-second">Tolak</button>
                    </div>
                    <div>
                      <button type="button" className="btn btn-link">Setujui</button>
                    </div>
                  </div>
                </a>
              </li>
              <hr />
              <li>
                <a href="#" className="dropdown-item px-2">
                  <p className="notif-text"><b>Niken Annisa Putri</b> meminta persetujuan untuk bergabung dalam event <b>Banjir Wilayah Sunter</b></p>
                  <div className="notif-footer">
                    <div className="mr-md-auto align-self-stretch my-auto">
                      <small>1m yang lalu</small>
                    </div>
                    <div>
                      <button type="button" className="btn btn-link btn-link-second">Tolak</button>
                    </div>
                    <div>
                      <button type="button" className="btn btn-link">Setujui</button>
                    </div>
                  </div>
                </a>
              </li>
            </div>
            <div className="notify-drop-footer text-center">
              <a href="#">Lihat Semua</a>
            </div>
          </ul>

        </div>
        <UncontrolledDropdown>
          <DropdownToggle caret tag='a'>
            admin 01
    </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>
              Pengaturan
      </DropdownItem>
            <DropdownItem tag='a' onClick={() => props.dispatch(showConfirmLogout())}>
              Keluar
      </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </header>
      <hr />
    </>
  )
}

export default connect()(Header)
