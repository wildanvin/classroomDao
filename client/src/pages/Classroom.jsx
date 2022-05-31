import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

function Classroom() {
  const params = useParams()

  const [classroomData, setClassroomData] = useState({
    id: '',
    formData: {},
  })

  useEffect(() => {
    const fetchClassroom = async () => {
      const response = await fetch(
        `http://localhost:5000/classrooms/${params.address}`
      )

      const data = await response.json()

      setClassroomData(data)
    }
    fetchClassroom()
  }, [])

  const { classroomName, description, email, sessions, startDate, tools } =
    classroomData.formData

  return (
    <div>
      <section className='heading'>
        <h1>{classroomName}</h1>
        <p>Teached by: {email}</p>
      </section>

      <p>
        <b>Address on chain:</b> {params.address}
      </p>
      <p>
        <b>Duration of the course in weeks (sessions):</b> {sessions}
      </p>
      <p>
        <b>Start date:</b> {startDate}
      </p>
      <p>
        <b>Description:</b> {description}
      </p>
      <p>
        <b>Tools we will use:</b> {tools}
      </p>
    </div>
  )
}

export default Classroom
