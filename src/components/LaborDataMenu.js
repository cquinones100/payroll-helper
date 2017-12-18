import React from 'react'
import './EmployeeDataTable.css'

export default function LaborDataMenu (props) {
  const dataLinks = props.data.reduce((acc, curr, index) => {
    acc.push(
      <div className='labor-data-selection' key={index} onClick={props.onClick} id={index}>
        {curr.location}
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
