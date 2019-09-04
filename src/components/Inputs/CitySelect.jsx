import React, { Component } from 'react'
import { FormGroup, Input } from 'reactstrap'
import { listCityApi } from 'services/api'

export class CitySelect extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       isLoading:true,
       cities:[],
       error:null
    }
    this.handleChange = this.handleChange.bind(this)
    this.loadCities = this.loadCities.bind(this)
  }

  componentDidMount() {
    this.loadCities()
  }
  
  async loadCities() {
    this.setState({ isLoading:true, error:null })
    try {
      const response = await listCityApi()
      const { status } = response.data
      if (status === 'success') {
        const { data:cities } = response.data
        this.setState({ isLoading: false, cities })
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
    const {cities} = this.state
    return (
      <FormGroup>
        <label htmlFor='city'>Kabupaten/Kota</label>
        <Input
          id='city'
          type='select'
          onChange={this.handleChange}
          value={this.props.value}
          disabled={this.props.disabled}
        >
          <option value=''>Pilih Kabupaten/Kota</option>
          {cities.map(city=><option value={city.id} key={city.id}>{city.name}</option>)}
        </Input>
      </FormGroup>
    )
  }
}
