import React from 'react'
import { Label, Input } from 'reactstrap'
import { Field } from 'formik'

export function InputItemsForm (props) {
  const { data } = props
  return (
    <div className='box-form'>
        <div>
            <Label for='item-type'>Jenis Barang Donasi</Label>
            <Field 
                name={'donation_items['+data+']type'}
                render={({ field }) => (
                <Input {...field} type='text' placeholder='Jenis Barang' />
                )}
            />
            {/* <Input type='text' name='item-type[]' /> */}
        </div>
        <div>
            <Label for='item-name'>Nama Barang Donasi</Label>
            <Field 
                name={'donation_items['+data+']name'}
                render={({ field }) => (
                <Input {...field} type='text' placeholder='Nama Barang' />
                )}
            />
            {/* <Input type='text' name='item-name[]' /> */}
        </div>
        <div>
            <Label for='item-amount'>Jumlah Barang</Label>
            <Field 
                name={'donation_items['+data+']amount'}
                render={({ field }) => (
                <Input {...field} type='text' placeholder='Jumlah Barang' />
                )}
            />
            {/* <Input type='number' name='item-quantity[]' /> */}
        </div>
    </div>
  )
}
