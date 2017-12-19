import React from 'react'
import './EmployeeDataTable.css'
import FontAwesome from 'react-fontawesome'

export default function LaborDataMenu (props) {
  const dataLinks = props.data.reduce((acc, curr, index) => {
    acc.push(
      <div className='labor-data-selection' key={index} >
        <div onClick={props.onClick} id={index} style={{float: 'left'}}>
          {curr.location}
        </div>
        {curr.needsTipSheet === true
        ? (
          <div
            style={{display: 'inline-block', float: 'right'}}
            onClick={props.uploadOnClick}
            >
            <FontAwesome
              name='cloud-upload'
            />
          </div>
        ) : (
          <FontAwesome
            name='check'
           />
        )}
      </div>
    )
    return acc
  }, [])
  if (props.data.length > 0) {
    return (
      <div className='labor-data-menu'>
        <div>
          locations
        </div>
        {dataLinks}
      </div>
    )
  } else {
    return <div />
  }
}

LaborDataMenu.defaultProps = {
  data: []
}
