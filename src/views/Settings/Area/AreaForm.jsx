import React, { Component } from 'react'
import { Main } from 'components'
import { CityForm } from './City/CityForm'
import { SubdistrictForm } from './Subdistrict/SubdistrictForm'
import { UrbanVillageForm } from './UrbanVillage/UrbanVillageForm'

import {
    detailsCityApi,
    storeCityApi,
    detailsSubdistrictApi,
    storeSubdistrictApi,
    detailsVillageApi,
    storeVillageApi,
    updateCityApi,
    updateSubdistrictApi,
    updateVillageApi,
    listCityApi,
    listSubdistrictApi
} from 'services/api'

import addCitySchema from 'validators/addCity'
import addSubdistrictSchema from 'validators/addSubdistrict'
import addVillageSchema from 'validators/addVillage'
import ucwords from 'utils/string'

export default class AreaForm extends Component {
    constructor(props) {
        super(props)
        const { area, areaId } = props.match.params
        this.state = {
            area: area,
            areaId: areaId,
            areaData: [],
            subdistricts: []
        }

        this.loadDetailsArea = this.loadDetailsArea.bind(this)
        this.handleSaveArea = this.handleSaveArea.bind(this)
        this.handleUpdateArea = this.handleUpdateArea.bind(this)
        this.handleSelectedCity = this.handleSelectedCity.bind(this)
        this.loadSubdistrict = this.loadSubdistrict.bind(this)
    }

    componentDidMount() {
        this.loadDetailsArea()
        this.loadSubdistrict()
    }

    handleSelectedCity(e) {
        const { areaData } = this.state
        let cities = areaData
        if (typeof areaData.selection !== "undefined") {
            const { selection } = areaData
            cities = selection
        }

        let city = cities.filter(city => {
            return city.id === parseInt(e.target.value)
        })
        if (city[0]) {
            let subdistricts = city[0].subdistricts
            this.setState({ subdistricts })
        }
    }

    async handleUpdateArea(areaId, values) {
        const { area } = this.state
        let response = null
        try {
            switch (area) {
                case 'kabupaten-kota':
                    response = await updateCityApi(areaId, values)
                    break
                case 'kelurahan-desa':
                    response = await updateVillageApi(areaId, values)
                    break
                case 'kecamatan':
                    response = await updateSubdistrictApi(areaId, values)
                    break
                default:
                    response = null
                    break
            }
            if (response !== null) {
                const { status } = response.data

                if (typeof status !== 'undefined') {
                    if (status === 'success') {
                        const { history } = this.props
                        history.push(`/admin/settings/regions/${area}`)
                    }
                }
            }
        } catch (error) {
            // TODO : handle error
            console.log(error)
        }
    }

    async handleSaveArea(values) {
        const { area } = this.state
        let response = null
        try {
            switch (area) {
                case 'kabupaten-kota':
                    response = await storeCityApi(values)
                    break
                case 'kelurahan-desa':
                    response = await storeVillageApi(values)
                    break
                case 'kecamatan':
                    response = await storeSubdistrictApi(values)
                    break
                default:
                    response = null
                    break
            }
            if (response !== null) {
                const { status } = response.data

                if (typeof status !== 'undefined') {
                    if (status === 'success') {
                        const { history } = this.props
                        history.push(`/admin/settings/regions/${area}`)
                    }
                }
            }
        } catch (error) {
            // TODO : handle error
            console.log(error)
        }
    }

    async loadDetailsArea() {
        const { area, areaId } = this.state
        let response = null
        try {
            switch (area) {
                case 'kabupaten-kota':
                    response = areaId ? await detailsCityApi(areaId) : null
                    break
                case 'kelurahan-desa':
                    response = areaId ? await detailsVillageApi(areaId) : await listCityApi()
                    break
                case 'kecamatan':
                    response = areaId ? await detailsSubdistrictApi(areaId) : await listCityApi()
                    break
                default:
                    response = null
                    break
            }
            if (response !== null) {
                const { status } = response.data

                if (typeof status !== 'undefined') {
                    if (status === 'success') {
                        const { data: areaData } = response.data
                        const { subdistricts } = areaData || null
                        if (subdistricts) {
                            this.setState({ subdistricts })
                        }
                        this.setState({ areaData })

                    }
                }
            }
        } catch (error) {
            // TODO : handle error
            console.log(error)
        }
    }

    async loadSubdistrict(cityId = '') {
        const subParams = new URLSearchParams()
        if (cityId) {
            subParams.append('c_id', cityId)    
        }

        const response = await listSubdistrictApi(subParams)
        if (response !== null) {
            const { status } = response.data
            if (status === 'success') {
                const { data: subdistricts } = response.data
                this.setState({ subdistricts })
            }
        }
    }

    render() {
        const { areaData, area, areaId, subdistricts } = this.state
        const areaText = ucwords(area.split('-').join(' / '))
        const title = `Tambah ${areaText} Baru`
        return (
            <Main title={title}>
                {(area === 'kabupaten-kota') &&
                    <CityForm
                        data={areaData}
                        validationSchema={addCitySchema}
                        areaId={areaId}
                        handleUpdateArea={this.handleUpdateArea}
                        handleSaveArea={this.handleSaveArea}
                    />
                }
                {(area === 'kecamatan') &&
                    <SubdistrictForm
                        data={areaData}
                        validationSchema={addSubdistrictSchema}
                        areaId={areaId}
                        handleUpdateArea={this.handleUpdateArea}
                        handleSaveArea={this.handleSaveArea}
                    />
                }
                {(area === 'kelurahan-desa') &&
                    <UrbanVillageForm
                        data={areaData}
                        validationSchema={addVillageSchema}
                        areaId={areaId}
                        handleUpdateArea={this.handleUpdateArea}
                        handleSaveArea={this.handleSaveArea}
                        handleSelectedCity={this.handleSelectedCity}
                        subdistricts={subdistricts}
                    />
                }
            </Main>
        )
    }
}