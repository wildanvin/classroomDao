import React from 'react'
import { useState, useEffect } from 'react'

import BackButton from '../components/BackButton'
import Web3 from 'web3'

function CreateClass(props) {
  const provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545')
  const web3 = new Web3(provider)

  const [formData, setFormData] = useState({
    classroomName: '',
    email: '',
    tAddress: props.address,
    sessions: 1,
    startDate: '',
    description: '',
    tools: '',
  })

  // useEffect(() => {
  //   const fgetWeb3 = async () => {
  //     const web3 = await getWeb3()
  //     console.log(web3)
  //     console.log('er')
  //   }
  //   fgetWeb3()
  //   console.log(web3)
  // }, [])

  const onClick = (e) => {
    e.preventDefault()
    console.log('helo')
    console.log(props.address)
  }

  const onSubmit = () => {
    return 'Hello'
  }

  const setDescription = (a) => {
    return `hey ${a}`
  }
  return (
    <>
      <BackButton url='/' />
      <section className='heading'>
        <h1>Create New Classroom</h1>
        <p>Let's teach and inspire together!</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='name'>Classroom Name</label>
            <input
              type='text'
              className='form-control'
              placeholder='Example: English class 2022'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='email'>Your Email</label>
            <input
              type='email'
              className='form-control'
              placeholder='wildanvin@example.com'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='teacher-addr'>
              Teacher address (your address):{' '}
            </label>
            <input
              type='text'
              className='form-control'
              value={formData.tAddress}
              disabled
            />
          </div>

          <div className='form-group'>
            <label htmlFor='course-length'>Length of class (weeks): </label>
            <input type='number' min='2' max='24' className='form-control' />
          </div>

          <div className='form-group'>
            <label htmlFor='start-date'>Start date: </label>
            <input type='date' className='form-control' />
          </div>

          <div className='form-group'>
            <label htmlFor='description'>Description of the class:</label>
            <textarea
              name='description'
              id='description'
              className='form-control'
              placeholder='The "what" and "how" students will learn'
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className='form-group'>
            <label htmlFor='tools'>Tools to be used:</label>
            <textarea
              name='tools'
              id='tools'
              className='form-control'
              placeholder="Discord, Trello, freeCodeCamp, Duolingo, Zoom, Coordinape, Patrick's 30+ hours video of blockchain development... There is a lot of resources to learn together :)"
            ></textarea>
          </div>
          <div className='form-group'>
            <button onClick={onClick} className='btn btn-block'>
              Create Classroom
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default CreateClass
