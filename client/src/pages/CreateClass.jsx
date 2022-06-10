import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import BackButton from '../components/BackButton'

import Web3 from 'web3'
import ClassroomFactoryContract from '../contracts/ClassroomFactory.json'

function CreateClass(props) {
  // const provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545')
  // const web3 = new Web3(provider)

  const web3 = new Web3(window.ethereum)

  const deployedNetwork = ClassroomFactoryContract.networks[props.networkId]
  const classroomFactory = new web3.eth.Contract(
    ClassroomFactoryContract.abi,
    deployedNetwork && deployedNetwork.address
  )

  const [formData, setFormData] = useState({
    classroomName: '',
    email: '',
    sessions: 1,
    startDate: '',
    description: '',
    tools: '',
  })

  const { classroomName, email, sessions, startDate, description, tools } =
    formData

  const navigate = useNavigate()

  const onClick = async (e) => {
    e.preventDefault()
    let createClassroomTx = await classroomFactory.methods
      .createClassroom(formData.sessions)
      .send({ from: props.accounts[0] })
      .on('receipt', async function (receipt) {
        alert(`Classroom created successfully`)
      })

    let idAddress = await createClassroomTx.events.ClassroomCreated.returnValues
      .classroomAddress

    let locally = 'http://localhost:5000/classrooms'
    let vercelApi = 'https://api-fawn-delta.vercel.app/api/classroom'
    let INPROD = true

    if (INPROD) {
      let response = await fetch(vercelApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: idAddress, formData }),
      })

      navigate(`/classroom/${idAddress}`)
    } else {
      let response = await fetch(locally, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: idAddress, formData }),
      })

      navigate(`/classroom/${idAddress}`)
    }
  }

  const onMutate = (e) => {
    // Text/Booleans/Numbers

    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  return (
    <>
      <BackButton url='/' />
      <section className='heading'>
        <h1>Create New Classroom</h1>
        <p>Let's teach and inspire together!</p>
      </section>

      <section className='form'>
        <form>
          <div className='form-group'>
            <label htmlFor='name'>Classroom Name</label>
            <input
              type='text'
              id='classroomName'
              value={classroomName}
              onChange={onMutate}
              className='form-control'
              placeholder='Example: English class 2022'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='email'>Your Email</label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={onMutate}
              className='form-control'
              placeholder='wilman@example.com'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='teacher-addr'>
              Teacher address (your address):{' '}
            </label>
            <input
              type='text'
              className='form-control'
              value={props.accounts[0]}
              disabled
            />
          </div>

          <div className='form-group'>
            <label htmlFor='course-length'>Length of class (weeks): </label>
            <input
              id='sessions'
              value={sessions}
              onChange={onMutate}
              type='number'
              min='2'
              max='24'
              className='form-control'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='start-date'>Start date: </label>
            <input
              id='startDate'
              value={startDate}
              onChange={onMutate}
              type='date'
              className='form-control'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='description'>Description of the class:</label>
            <textarea
              name='description'
              id='description'
              value={description}
              onChange={onMutate}
              className='form-control'
              placeholder='The "what" and "how" students will learn'
            ></textarea>
          </div>

          <div className='form-group'>
            <label htmlFor='tools'>Tools to be used:</label>
            <textarea
              name='tools'
              id='tools'
              value={tools}
              onChange={onMutate}
              className='form-control'
              placeholder="Discord, Trello, freeCodeCamp, Duolingo, Zoom, Coordinape, Patrick's 30+ hours video of blockchain development... There is a lot of resources to learn together :)"
            ></textarea>
          </div>
          <div className='form-group'>
            <button onClick={onClick} className='btn btn-block'>
              Create Classroom
            </button>
            <br />
            <br />
            <br />
          </div>
        </form>
      </section>
    </>
  )
}

export default CreateClass
