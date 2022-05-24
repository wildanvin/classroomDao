import React from 'react'

import { FaLaugh, FaChalkboardTeacher } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>classroomDAO</Link>
      </div>
      <ul>
        <li>
          <Link to='/login'>
            <FaChalkboardTeacher /> Create Classroom
          </Link>
        </li>
        <li>
          <Link to='/register'>
            <FaLaugh /> Enroll
          </Link>
        </li>
      </ul>
    </header>
  )
}

export default Header
