import React from 'react'
import { Tool, AddNewActionButton, PaginationLink, EditActionButton, OptionMembership } from 'components'
import { Table, Input,Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'

export function UnitTable(props) {
  const {
    isOpen,
    currentPage,
    numberOfPages,
    from,
    to,
    numberOfEntries,
    pathname,
    title,
    cityData,
    memberData,
    unitData
  } = props

  return (
    <>
      <div className="head-tools">
        <div className="mr-md-auto align-self-stretch">
          <Tool onSearch={props.handleSearch}>
            <AddNewActionButton path={`${pathname}/create`} tooltipText={`Tambah ${title} Baru`} />
          </Tool>
        </div>
        <div className="ml-md-auto align-self-stretch">
          <div className="form-inline my-3">
            <h2 className="my-auto">Filter:</h2>
            <div className="form-group ml-3">
              <Input type="select" id="cityFilter" onChange={props.handleFilterCity}>
                <option value="0">Pilih Kabupaten</option>
                {cityData.map((city, key) => {
                  return (
                    <option key={key} value={city.id}>{city.name}</option>
                  )
                })}
              </Input>
            </div>
            <div className="form-group ml-3">
              <Input type="select" id="filterParent" onChange={props.handleFilterParent}>
                <option value="0">Pilih Jenis Anggota</option>
                <OptionMembership membership={memberData} mode="3" />
              </Input>
            </div>

            <button
              type="button"
              onClick={props.handleReset}
              className="btn circle-table btn-reset"
              data-toggle="tooltip"
              data-placement="top"
              data-original-title="Reset"></button>
          </div>
        </div>
      </div>
      <PaginationLink
        rowFrom={from}
        rowTo={to}
        numberOfEntries={numberOfEntries}
        currentPage={currentPage}
        numberOfPages={numberOfPages}
        onPageChange={props.goToPage}
      />
      <Table hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Unit</th>
            <th>Kabupaten/Kota</th>
            <th>Jenis Anggota</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {unitData &&
            unitData.map((unit, key) => {
              const { membership } = unit
              const { city } = unit
              const { parent_member } = membership
              return (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>{unit.name}</td>
                  <td>{(city) ? city.name : ""} </td>
                  <td>{(parent_member) ? parent_member.name + ' >> ' + membership.name : membership.name} </td>
                  <td>
                    <EditActionButton path={`${pathname}/${unit.id}/edit`} />
                    <Button
                      onClick={() => props.toggle(unit.id)}
                      className='btn btn-table circle-table delete-table'
                      title='Hapus'
                    />

                  </td>
                </tr>
              )
            })}
        </tbody>
      </Table>
      <Modal isOpen={isOpen} toggle={props.toggle}>
        <ModalHeader >Hapus Data</ModalHeader>
        <ModalBody>
          <p>Anda yakin menghapus data ini?</p>
        </ModalBody>
        <ModalFooter>
          <Button color='secondary' onClick={props.toggle}>Batal</Button>{' '}
          <Button color='danger' onClick={props.onAction}>Hapus</Button>
        </ModalFooter>
      </Modal>
    </>
  )
}