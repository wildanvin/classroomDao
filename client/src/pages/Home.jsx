import React from 'react'
import { Link } from 'react-router-dom'

import { FaLaugh, FaChalkboardTeacher } from 'react-icons/fa'

function Home() {
  return (
    <>
      <section className='heading'>
        <h1>Lets start learning</h1>
        <p>Please choose from an option below</p>
      </section>

      <Link to='/create-class' className='btn btn-reverse btn-block'>
        <FaChalkboardTeacher /> Create New Classroom
      </Link>

      <Link to='/enroll' className='btn btn-block'>
        <FaLaugh /> Learn Something New
      </Link>
    </>
  )
}
export default Home
