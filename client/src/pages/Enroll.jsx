import React from 'react'
import Card from '../components/Card'
import BackButton from '../components/BackButton'

function Enroll() {
  return (
    <>
      <BackButton url='/' />

      <Card>
        <h2>English Class Summer 2022</h2>

        <p>Teached by: Wilman</p>
        <p>Remaining spots available: 14</p>

        <button className='btn btn-reverse btn-block'>More info</button>
        <button className='btn btn-block'>Enroll</button>
      </Card>

      <Card>
        <h2>Introduction to economy</h2>

        <p>Teached by: Santiago</p>
        <p>Remaining spots available: 5</p>

        <button className='btn btn-reverse btn-block'>More info</button>
        <button className='btn btn-block'>Enroll</button>
      </Card>

      <Card>
        <h2>How to use the blockchain</h2>

        <p>Teached by: Wilman</p>
        <p>Remaining spots available: 1</p>

        <button className='btn btn-reverse btn-block'>More info</button>
        <button className='btn btn-block'>Enroll</button>
      </Card>
    </>
  )
}

export default Enroll
