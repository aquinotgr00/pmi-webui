import React from 'react'
import { FormGroup, Label, Input } from 'reactstrap'

export function InputItemsForm (props) {
  return (
    <>
        <Label for='donationItemHeading'>Barang Donasi</Label>
        <div className='box-form'>
            <div>
                <Label for='item-type'>Jenis Barang Donasi</Label>
                <Input type='text' name='item-type[]' />
            </div>
            <div>
                <Label for='item-name'>Nama Barang Donasi</Label>
                <Input type='text' name='item-name[]' />
            </div>
            <div>
                <Label for='item-quantity'>Jumlah Barang</Label>
                <Input type='number' name='item-quantity[]' />
            </div>
        </div>
    </>
  )
}
