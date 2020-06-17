import React from 'react'
import { Link } from 'react-router-dom'

export function ImageForm (props) {
  return (
    <div className="mb-4">
        <label htmlFor="exampleFormControlSelect1">{props.title}</label>
        <div className="mb-2">
            <Link to="#" data-toggle="modal" role="button" data-target="#ModalMediaLibrary">
              <img className="img-fluid img-thumbnail add-img-kwitansi" src={require('assets/images/image-plus.svg')} alt="" />
            </Link>
        </div>
        <small><span>Image size must be 1920x600 with maximum file size</span>
        <span>400 kb</span></small>
    </div>
  )
}
