import React, { Component } from 'react'
import { FormGroup, Input } from 'reactstrap'
import { listSubdistrictApi } from 'services/api'

export class SubdistrictSelect extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       isLoading:true,
       subdistricts:[],
       error:null
    }
    this.handleChange = this.handleChange.bind(this)
    this.loadSubdistricts = this.loadSubdistricts.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    const {cityId} = this.props
    if(cityId!==prevProps.cityId) {
      this.loadSubdistricts(cityId)
    }
  }
  
  
  async loadSubdistricts(cityId) {
    const subdistrictParams = new URLSearchParams()
    subdistrictParams.append('c_id', cityId)
    this.setState({ isLoading:true, error:null })
    try {
      const response = await listSubdistrictApi(subdistrictParams)
      
      const { status } = response.data
      if (status === 'success') {
        const { data:subdistricts } = response.data
        this.setState({ isLoading: false, subdistricts })
      } else {
        // TODO : handle error
        this.setState({ isLoading: false, error: null })
      }
    } catch (error) {
      // TODO : handle error
      this.setState({ isLoading: false, error: null })
    }
  }
  
  handleChange(event) {
    this.props.onChange(event.target.value)
  }

  render() {
    const {subdistricts} = this.state
    return (
      <FormGroup>
        <label htmlFor='subdistrict'>Kecamatan</label>
        <Input id='subdistrict' type='select' onChange={this.handleChange} defaultValue=''>
          <option value=''>Pilih Kecamatan</option>
          {subdistricts.map(subdistrict=><option value={subdistrict.id} key={subdistrict.id}>{subdistrict.name}</option>)}
        </Input>
      </FormGroup>
    )
  }
}
