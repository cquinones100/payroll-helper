import React from 'react'
import '../App.css'

export default function Upload (props) {
  return (
    <div className={props.employeeData.data.length === 0
        ? "App" : "App pushed"}>

        <div className="upload-file">
          <div
            className='upload-file-button'
            onClick={props.onClick}>
            upload a file
          </div>
          <div
            className='upload-file-button'
            onClick={props.clearOnClick}>
            clear data
          </div>

          id="file-upload"
          type="file"
          onChange={props.onChange}
          accept='.csv'
          style={{display: 'none'}}
        />
      </div>
    </div>
  )
}
