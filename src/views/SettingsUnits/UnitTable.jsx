import React from 'react'
import { Tool, AddNewActionButton, PaginationLink, EditActionButton, ConfirmModal } from 'components'
import { Row, Col, Table, Input, Button } from 'reactstrap'

export function UnitTable(props) {
  const {
    isOpen,
    toggle,
    currentPage,
    numberOfPages,
    from,
    to,
    numberOfEntries,
    pathname,
    title,
    cityData,
    parentData,
    subData,
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
                {Object.values(parentData).map((parent, key) => {
                  return (
                    <option key={key} value={parent.id}>{parent.circular}</option>
                  )
                })}
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
              const { membership } = unit || null
              const { city } = unit || null
              const { parent_member } = membership || null
              return (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>{unit.name}</td>
                  <td>{(city) ? city.name : ""} </td>
                  <td>{(parent_member) ? parent_member.name+' > '+membership.name :  membership.name } </td>
                  <td>
                    <EditActionButton path={`${pathname}/${unit.id}/edit`} />
                    <Button
                      onClick={toggle}
                      className='btn btn-table circle-table delete-table'
                      title='Hapus'
                    />
                    <ConfirmModal
                      isOpen={isOpen}
                      toggle={toggle}
                      onAction={() => props.onAction(unit.id)}
                      labelTitle="Hapus Data"
                      labelContent="Anda yakin akan menghapus data ini?"
                      labelAction="Hapus"
                    />
                  </td>
                </tr>
              )
            })}
        </tbody>
      </Table>
    </>
  )
}