import React from 'react'
import { useNavigate } from 'react-router-dom'

import Card from './Card'

function ClassroomItem(props) {
  const navigate = useNavigate()

  const onClick = (e) => {
    e.preventDefault()
    navigate(`/classroom/${props.address}`)
  }

  return (
    <>
      <Card>
        <h2>{props.data.classroomName}</h2>

        <p>
          <b>Teached by:</b> {props.data.email}
        </p>
        <p>
          <b>Start Date:</b> {props.data.startDate}
        </p>
        <p>
          <b>Adress on Chain</b> {props.address}
        </p>
        <br />

        <button onClick={onClick} className='btn btn-block'>
          More info
        </button>
      </Card>
    </>
  )
}

export default ClassroomItem
