import React, { Component } from 'react'
import { Main } from 'components'
import { Formik, Form, Field } from 'formik'
import { FormGroup, Input, Label, Button, FormFeedback } from 'reactstrap'
import UpdateVolunteerSchema from 'validators/updateVolunteer'
import { withRouter } from 'react-router-dom'
import { getVolunteerApi, getSubdistrictListApi, postVolunteerUpdateApi, getParentMemberListApi, getMembershipListApi, getUnitListApi } from 'services/api';

class VolunteerForm extends Component {
	constructor (props) {
    super(props)

    this.state = {
      name: '',
      birthplace: '',
      dob: '',
      gender: '',
      religion: '',
      city: '',
      subdistrict: '',
      subdivision: '',
      unit: '',
      type: '',
      sub_type: '',
      subdistrictList: [],
      membershipList: [],
      subMembershipList: [],
      unitList: [],
    }

    this.loadMembership = this.loadMembership.bind(this)
    this.loadSubMembership = this.loadSubMembership.bind(this)
    this.loadUnit = this.loadUnit.bind(this)
    this.loadVolunteer = this.loadVolunteer.bind(this)
    this.handleUpdateVolunteer = this.handleUpdateVolunteer.bind(this)
    this.loadSubdistricts = this.loadSubdistricts.bind(this)
    this.renderListElement = this.renderListElement.bind(this)
  }

  componentDidMount () {
    const { userId: volunteerId } = this.props.params
    this.loadVolunteer(volunteerId)
  }

  async loadMembership () {
    const response = await getParentMemberListApi()
    const { status } = response.data
    if (status === 'success') {
      const { data } = response.data
      this.setState({membershipList:data})
    }
  }

  async loadSubMembership () {
    const response = await getMembershipListApi({sub: this.state.unit})
    const { status } = response.data
    if (status === 'success') {
      const { data } = response.data
      this.setState({subMembershipList:data})
    }
  }

  async loadUnit () {
    const response = await getUnitListApi({s:this.state.unit})
    const { status } = response.data
    if (status === 'success') {
      const { data } = response.data
      this.setState({unitList:data})
    }
  }

  async loadVolunteer (volunteerId) {
    const response = await getVolunteerApi(volunteerId)
    const { status } = response.data

    if (status === 'success') {
      const { data } = response.data
      const {
        name, birthplace, dob, gender, religion, city,
        subdistrict, subdivision
      } = data

      const type =  data.unit.membership.parent_member.name
      const sub_type =  data.unit.membership.name
      const unit = data.unit.name

      this.setState({
        name, birthplace, dob, gender, religion, city,
        subdistrict, subdivision, unit, type, sub_type
      })
      this.loadSubdistricts(city)
      this.loadUnit()
      this.loadMembership()
      this.loadSubMembership()
    }
  }
  
  async handleUpdateVolunteer (values) {
    const { userId: volunteerId } = this.props.params
    values._method = 'PUT'
    console.log(values)
    const response = await postVolunteerUpdateApi(volunteerId, values)
    const { status } = response.data
    if (status === 'success') {
      alert('Berhasil! Relawan terupdate')
      this.props.history.push('/admin/users/volunteer')
    }
  }

  async loadSubdistricts (city) {
    const response = await getSubdistrictListApi({s: city})
    const { status } = response.data
    if (status === 'success') {
      const { data } = response.data
      delete data.filter_city
      this.setState({subdistrictList: data})
    }
  }

  renderListElement (data) {
	if (Object.keys(data).length > 0) {
		const subdisArray = Object.values(data)
		return subdisArray.map((sub, key) => {
        return <option key={key}>{sub.name}</option>
			}
		)
	}
}

	render(){
    const title = `Edit Volunteer`
    const {
      name, birthplace, dob, gender, religion, city,
      subdistrict, subdivision, unit, type, sub_type
    } = this.state
    let initialValues = {
      name, birthplace, dob, gender, religion, city,
      subdistrict, subdivision, unit, type, sub_type
    }
		return (
			<Main title={title}>
        <Formik
            enableReinitialize={true} 
            initialValues={initialValues}
            validationSchema={UpdateVolunteerSchema}
            onSubmit={(values, { setSubmitting }) => {
              this.handleUpdateVolunteer(values)
              setSubmitting(false)
            }}
          >
          {({
              errors,
              handleSubmit,
              isSubmitting
            }) => (
              <Form onSubmit={handleSubmit} className='col-md-6 col-lg7 pl-0'>

                <FormGroup>
                  <Label>Nama</Label>
                  <Field
                    name="name"
                    render={({ field }) => (
                      <Input {...field}
                        type="text"
                        invalid={errors.name !== undefined}
                      />
                    )} />

                  {errors.name !== undefined ? <FormFeedback>{errors.name}</FormFeedback> : ''}
                </FormGroup>
                
                <FormGroup>
                  <Label>Tempat Lahir</Label>
                  <Field
                    name="birthplace"
                    render={({ field }) => (
                      <Input {...field}
                        type="text"
                        invalid={errors.birthplace !== undefined}
                      />
                    )} />

                  {errors.birthplace !== undefined ? <FormFeedback>{errors.birthplace}</FormFeedback> : ''}
                </FormGroup>
                
                <FormGroup>
                  <Label>Tanggal Lahir</Label>
                  <Field
                    name="dob"
                    render={({ field }) => (
                      <Input {...field}
                        type="date"
                        invalid={errors.dob !== undefined}
                      />
                    )} />

                  {errors.dob !== undefined ? <FormFeedback>{errors.dob}</FormFeedback> : ''}
                </FormGroup>
                
                <FormGroup>
                  <Label>Jenis Kelamin</Label>
                  <Field
                    name="gender"
                    render={({ field }) => (
                      <Input {...field}
                        type="select"
                        invalid={errors.gender !== undefined}
                      >
                        <option value={null}>Pilih Jenis Kelamin</option>
                        <option value="male">Laki-laki</option>
                        <option value="female">Perempuan</option>
                      </Input>
                    )} />

                  {errors.gender !== undefined ? <FormFeedback>{errors.gender}</FormFeedback> : ''}
                </FormGroup>
                
                <FormGroup>
                  <Label>Agama</Label>
                  <Field
                    name="religion"
                    render={({ field }) => (
                      <Input {...field}
                        type="select"
                        invalid={errors.religion !== undefined}
                      >
                        <option>Islam</option>
                        <option>Hindu</option>
                        <option>Kristen</option>
                        <option>Katolik</option>
                        <option>Konghucu</option>
                        <option>Buddha</option>
                      </Input>
                    )} />

                  {errors.religion !== undefined ? <FormFeedback>{errors.religion}</FormFeedback> : ''}
                </FormGroup>
                
                <FormGroup>
                  <Label>Kabupaten/Kota</Label>
                  <Field
                    name="city"
                    render={({ field }) => (
                      <Input {...field}
                        type="select"
                        invalid={errors.city !== undefined}
                      >
                        <option>Jakarta Barat</option>
                        <option>Jakarta Pusat</option>
                        <option>Jakarta Selatan</option>
                        <option>Jakarta Timur</option>
                        <option>Jakarta Utara</option>
                        <option>Kepulauan Seribu</option>
                      </Input>
                    )} />

                  {errors.city !== undefined ? <FormFeedback>{errors.city}</FormFeedback> : ''}
                </FormGroup>
                
                <FormGroup>
                  <Label>Kecamatan</Label>
                  <Field
                    name="subdistrict"
                    render={({ field }) => (
                      <Input {...field}
                        type="select"
                        invalid={errors.subdistrict !== undefined}
                      >
                        {this.renderListElement(this.state.subdistrictList)}
                      </Input>
                    )} />

                  {errors.subdistrict !== undefined ? <FormFeedback>{errors.subdistrict}</FormFeedback> : ''}
                </FormGroup>
                
                <FormGroup>
                  <Label>Kelurahan/Desa</Label>
                  <Field
                    name="subdivision"
                    render={({ field }) => (
                      <Input {...field}
                        type="text"
                        invalid={errors.subdivision !== undefined}
                      />
                    )} />

                  {errors.subdivision !== undefined ? <FormFeedback>{errors.subdivision}</FormFeedback> : ''}
                </FormGroup>
                
                <FormGroup>
                  <Label>Unit</Label>
                  <Field
                    name="unit"
                    render={({ field }) => (
                      <Input {...field}
                        type="select"
                        invalid={errors.unit !== undefined}
                      >
                        {this.state.unitList.map((item, key) => <option key={key} value={item.id}>{item.name}</option>)}
                      </Input>
                    )} />

                  {errors.unit !== undefined ? <FormFeedback>{errors.unit}</FormFeedback> : ''}
                </FormGroup>
                
                <FormGroup>
                  <Label>Jenis Anggota</Label>
                  <Field
                    name="sub_type"
                    render={({ field }) => (
                      <Input {...field}
                        type="select"
                        invalid={errors.sub_type !== undefined}
                      >
                        {this.state.membershipList.map((item, key) => <option key={key} value={item.name}>{item.circular}</option>)}
                      </Input>
                    )} />

                  {errors.sub_type !== undefined ? <FormFeedback>{errors.sub_type}</FormFeedback> : ''}
                </FormGroup>

                <div className='float-right'>
                  <Button type='submit' color='success' disabled={isSubmitting}>Simpan</Button>
                </div>

              </Form>
            )}
        </Formik>
			</Main>
		)
	}
}

export default withRouter(VolunteerForm)