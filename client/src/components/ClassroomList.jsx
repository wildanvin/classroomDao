import React from 'react'
import { useEffect, useState } from 'react'
import ClassroomItem from './ClassroomItem'

function ClassroomList() {
  const [classrooms, setClassrooms] = useState([])

  useEffect(() => {
    const fetchClassroom = async () => {
      let locally = 'http://localhost:5000/classrooms'
      let vercelApi = 'https://api-fawn-delta.vercel.app/api/classrooms'
      let INPROD = true

      if (INPROD) {
        const response = await fetch(vercelApi)
        const data = await response.json()
        setClassrooms(data)
      } else {
        const response = await fetch(locally)
        const data = await response.json()

        setClassrooms(data)
      }
    }
    fetchClassroom()
  }, [])

  if (!classrooms || classrooms.length === 0) {
    return <h2>No classrooms yet</h2>
  }

  //console.log(typeof classrooms)

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
