import React from 'react'
import { useEffect, useState } from 'react'
import ClassroomItem from './ClassroomItem'

function ClassroomList() {
  const [classrooms, setClassrooms] = useState([])

  useEffect(() => {
    const fetchClassroom = async () => {
      const response = await fetch(`http://localhost:5000/classrooms/`)

      const data = await response.json()

      setClassrooms(data)
    }
    fetchClassroom()
  }, [])

  if (!classrooms || classrooms.length === 0) {
    return <h2>No classrooms yet</h2>
  }

  console.log(typeof classrooms)

  return (
    <>
      <ul>
        {classrooms.map((classroom) => (
          <ClassroomItem
            key={classroom.id}
            data={classroom.formData}
            address={classroom.id}
          />
        ))}
      </ul>
    </>
  )
}

export default ClassroomList
