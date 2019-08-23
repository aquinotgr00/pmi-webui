import React from 'react'
import { Row, Col, Label, FormGroup, Input, Tooltip, Button } from 'reactstrap'
import ReactToPrint from 'react-to-print'

function renderListElement (data) {
	if (Object.keys(data).length > 0) {
		const subdisArray = Object.values(data)
		return subdisArray.map((sub, key) => {
				return sub.name ? (
					<option key={key} value={sub.id}>{sub.name}</option>
				) : ( null )
			}
		)
	}
}

export function VolunteerFilter (props) {
	return (
		<div className="filter my-3">
			<Row>
			  <Col md>
				<FormGroup>
				  <Label htmlFor="type">Jenis Anggota</Label>
					<Input type='select' onChange={e => props.onChange({t: e.target.value === 'null' ? null:e.target.value})}>
						<option value='null'>Pilih Jenis Anggota</option>
						<option>PALANG MERAH REMAJA</option>
						<option>KORPS SUKARELA</option>
						<option>TENAGA SUKARELA</option>
						<option>PENGURUS</option>
					</Input>
				</FormGroup>
			  </Col>
			  <Col md>
				<div className="form-group">
				  <Label htmlFor="exampleInputCategoryRelatedTag">SubJenis Anggota</Label>
				  <Input type='select' onChange={e => props.onChange({st: e.target.value === 'null' ? null:e.target.value})}>
					  <option value='null'>Pilih Sub Jenis Anggota</option>
					  <option>MULA</option>
					  <option>MADYA</option>
					  <option>WIRA</option>
				  </Input>
				</div>
			  </Col>
			  <Col md>
				<div className="form-group">
				  <Label htmlFor="exampleInputCategoryRelatedTag">Kota/Kabupaten</Label>
				  <Input type='select' onChange={e => props.onProvinceChange({c: e.target.value === 'null' ? null:e.target.value})}>
					  <option value='null'>Pilih Kota/Kabupaten</option>
					  <option value='151'>JAKARTA BARAT</option>
					  <option value='152'>JAKARTA PUSAT</option>
					  <option value='153'>JAKARTA SELATAN</option>
					  <option value='154'>JAKARTA TIMUR</option>
					  <option value='155'>JAKARTA UTARA</option>
					  <option value='189'>KEP. SERIBU</option>
				  </Input>
				</div>
			  </Col>
			  <Col md>
				<div className="form-group">
				  <Label htmlFor="exampleInputCategoryRelatedTag">Kecamatan</Label>
          <Input type='select' ref={props.selectInput} defaultValue='null' onChange={e => props.onChange({sd: e.target.value === 'null' ? null:e.target.value})}>
					  <option value='null'>Pilih Kecamatan</option>
					  {renderListElement(props.subdistricts)}
          </Input>
				</div>
			  </Col>
			  <Col md>
				<div className="form-group">
				  <Label htmlFor="exampleInputCategoryRelatedTag">Unit</Label>
				  <Input type='select' ref={props.selectInput} defaultValue='null' onChange={e => props.onChange({u: e.target.value === 'null' ? null:e.target.value})}>
					  <option value='null'>Pilih Unit</option>
					  {renderListElement(props.units)}
				  </Input>
				</div>
			  </Col>
			  <Col xs>
				<div className="mt-reset">
				  <button className="btn circle-table btn-reset" data-toggle="tooltip" id='buttonTooltip'>
				  </button>
          <Tooltip placement='top' isOpen={props.tootltipOpen} target="buttonTooltip" toggle={props.tooltipToggle}>
            Reset
          </Tooltip>
				</div>
			  </Col>
			  <Col md>
				<div className="form-group float-right">
				  <div>
					<label>Export Data</label>
				  </div>
				  <div className="btn-group" role="group" aria-label="#">
					<Button onClick={props.handleExportPdf} className="btn btn-line">PDF</Button>
					<Button onClick={props.handlePrint} className="btn btn-line">Print</Button>
          <ReactToPrint
            trigger={() => <Button className="btn btn-line" >Print</Button>}
            content={() => props.volunteerTable}
          />
				  </div>
				</div> 
			  </Col>
			</Row>
		</div>
	)
}