import React, { Component } from 'react'

import BackButton from '../components/BackButton'

import SimpleStorageContract from '../contracts/SimpleStorage.json'
import getWeb3 from '../getWeb3'

class CreateClass extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null }

  componentDidMount = async () => {
    try {
      console.log('mounting APP')
      // Get network provider and web3 instance.
      const web3 = await getWeb3()
      console.log(web3)

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts()
      console.log(accounts)

      // Get the contract instance.
      const networkId = await web3.eth.net.getId()
      const deployedNetwork = SimpleStorageContract.networks[networkId]
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address
      )

      //console.log(networkId)
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState(
        { web3, accounts, contract: instance } /*, this.runExample*/
      )
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      )
      console.error(error)
    }
  }

  runExample = async () => {
    const { accounts, contract } = this.state
    //console.log(contract)

    // Stores a given value, 5 by default.
    await contract.methods.set(5).send({ from: accounts[0] })

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call()

    // Update state with the result.
    this.setState({ storageValue: response })
  }
  onClick = (e) => {
    e.preventDefault()
    console.log('helo')
    console.log(this.state.accounts)
    console.log(this.state.web3)
  }

  onSubmit = () => {
    return 'Hello'
  }

  setDescription = (a) => {
    return `hey ${a}`
  }
  render() {
    return (
      <>
        <BackButton url='/' />
        <section className='heading'>
          <h1>Create New Classroom</h1>
          <p>Let's teach and inspire together!</p>
        </section>

        <section className='form'>
          <form onSubmit={this.onSubmit}>
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
              <label htmlFor='teacher-addr'>Teacher address: </label>
              <input
                type='text'
                className='form-control'
                value='0x1dcd9b43C01fC91a93b6417ef22ca8112f46dc0f'
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
              <button onClick={this.onClick} className='btn btn-block'>
                Create Classroom
              </button>
            </div>
          </form>
        </section>
      </>
    )
  }
}

export default CreateClass
