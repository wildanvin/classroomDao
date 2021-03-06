import React, { Component } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css'
import Header from './components/Header'
import Enroll from './pages/Enroll'
import CreateClass from './pages/CreateClass'
import Home from './pages/Home'
import Connect from './pages/Connect'
import Classroom from './pages/Classroom'

import SimpleStorageContract from './contracts/SimpleStorage.json'
import getWeb3 from './getWeb3'

class App extends Component {
  state = {
    storageValue: 0,
    web3: null,
    accounts: null,
    contract: null,
    networkId: null,
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3()

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts()

      // Get the contract instance.
      const networkId = await web3.eth.net.getId()
      //console.log(`network id is ${networkId}. this is from app`)
      const deployedNetwork = SimpleStorageContract.networks[networkId]
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address
      )

      //console.log(networkId)
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState(
        { web3, accounts, contract: instance, networkId } /*, this.runExample*/
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

  render() {
    if (!this.state.web3) {
      return <Connect />
    }
    return (
      <>
        <Router>
          <div className='container'>
            <Header />
            <Routes>
              <Route path='/' element={<Home />}></Route>

              <Route
                path='/create-class'
                element={
                  <CreateClass
                    accounts={this.state.accounts}
                    networkId={this.state.networkId}
                  />
                }
              ></Route>
              <Route path='/enroll' element={<Enroll />}></Route>
              <Route
                path='/classroom/:address'
                element={<Classroom accounts={this.state.accounts} />}
              />
            </Routes>
            {/* <h1>Good to Go!</h1>
            <p>Your Truffle Box is installed and ready.</p>
            <h2>Smart Contract Example</h2>
            <p>
              If your contracts compiled and migrated successfully, below will
              show a stored value of 5 (by default).
            </p>
            <p>
              Try changing the value stored on <strong>line 42</strong> of
              App.js.
            </p>
            <div>The stored value is: {this.state.storageValue}</div> */}
          </div>
        </Router>
      </>
    )
  }
}

export default App
