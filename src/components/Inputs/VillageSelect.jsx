import React, { Component } from 'react'
import { FormGroup, Input } from 'reactstrap'
import { listVillageApi } from 'services/api'

export class VillageSelect extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       isLoading:true,
       villages:[],
       error:null
    }
    this.handleChange = this.handleChange.bind(this)
    this.loadVillages = this.loadVillages.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    const {subdistrictId} = this.props
    if(subdistrictId!==prevProps.subdistrictId) {
      this.loadVillages(subdistrictId)
    }
  }
  
  
  async loadVillages(subdistrictId) {
    const villageParams = new URLSearchParams()
    villageParams.append('s_id', subdistrictId)
    this.setState({ isLoading:true, error:null })
    try {
      const response = await listVillageApi(villageParams)
      
      const { status } = response.data
      if (status === 'success') {
        const { data:villages } = response.data
        this.setState({ isLoading: false, villages })
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
    const {villages} = this.state
    return (
      <FormGroup>
        <label htmlFor='village'>Kelurahan</label>
        <Input id='village' type='select' onChange={this.handleChange} defaultValue=''>
          <option value=''>Pilih Kelurahan</option>
          {villages.map(village=><option value={village.id} key={village.id}>{village.name}</option>)}
        </Input>
      </FormGroup>
    )
  }
}
