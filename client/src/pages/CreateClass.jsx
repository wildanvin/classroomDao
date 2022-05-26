import React from 'react'
import BackButton from '../components/BackButton'

function CreateClass() {
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
            <input type='email' className='form-control' />
          </div>

          <div className='form-group'>
            <label htmlFor='teacher-addr'>Teacher address: </label>
            <input
              type='text'
              className='form-control'
              value='0x1dcd9b43C01fC91a93b6417ef22ca8112f46dc0f'
              disabled
            />
          </div>

          <div className='form-group'>
            <label htmlFor='number-of-students'>Number of students: </label>
            <input
              type='number'
              min='10'
              max='40'
              className='form-control'
              placeholder='min: 10, max:40'
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
              placeholder='The "what" and "how students will learn"'
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className='form-group'>
            <label htmlFor='tools'>Tools to be used:</label>
            <textarea
              name='tools'
              id='tools'
              className='form-control'
              placeholder='Discord, Trello, freeCodeCamp, Duolingo, Zoom, Coordinape... There is a lot of resources :)'
            ></textarea>
          </div>
          <div className='form-group'>
            <button className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default CreateClass
