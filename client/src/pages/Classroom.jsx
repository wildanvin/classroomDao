import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import BackButton from '../components/BackButton'

import ClassroomContract from '../contracts/Classroom.json'
import Web3 from 'web3'

function Classroom(props) {
  const params = useParams()

  const [classroomData, setClassroomData] = useState({
    id: '',
    formData: {},
  })

  const [transactionData, setTransactionData] = useState({
    txToConfirm: 0,
    txToRevoke: 0,
    txToExecute: 0,
    balance: 0,
  })

  const onMutate = (e) => {
    // Text/Booleans/Numbers

    setTransactionData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  //   console.log(classroomContract)

  useEffect(() => {
    const fetchClassroom = async () => {
      const response = await fetch(
        `http://localhost:5000/classrooms/${params.address}`
      )

      const data = await response.json()

      setClassroomData(data)
    }
    fetchClassroom()

    const web3 = new Web3(window.ethereum)
    const classroomContract = new web3.eth.Contract(
      ClassroomContract.abi,
      params.address
    )

    classroomContract.setProvider(window.ethereum)

    async function checkBalance() {
      try {
        web3.eth.getBalance(params.address).then((balanceInWei) => {
          let balance = web3.utils.fromWei(balanceInWei)
          //   console.log('Balance in wei:', balanceInWei)
          //   console.log('Balance in ETH:', balance)
          setTransactionData({
            txToConfirm: 0,
            txToRevoke: 0,
            txToExecute: 0,
            balance: balance,
          })
        })
      } catch (error) {
        console.log(error)
      }
    }

    checkBalance()
  }, [])

  const { classroomName, description, email, sessions, startDate, tools } =
    classroomData.formData

  const web3 = new Web3(window.ethereum)
  const classroomContract = new web3.eth.Contract(
    ClassroomContract.abi,
    params.address
  )

  const onEnroll = async (e) => {
    e.preventDefault()

    classroomContract.setProvider(window.ethereum)

    await classroomContract.methods
      .register()
      .send({ from: props.accounts[0] })
      .on('receipt', async function (receipt) {
        alert(`You are part of this class now. Good luck!`)
      })
  }

  const onTransaction = async (e) => {
    e.preventDefault()
    classroomContract.setProvider(window.ethereum)

    await classroomContract.methods
      .submitTransaction()
      .send({ from: props.accounts[0] })
      .on('receipt', async function (receipt) {
        alert(`Transaction submitted. Waiting for aproval and execution`)
      })
  }

  const onConfirm = async (e) => {
    e.preventDefault()

    classroomContract.setProvider(window.ethereum)

    await classroomContract.methods
      .confirmTransaction(transactionData.txToConfirm)
      .send({ from: props.accounts[0] })
      .on('receipt', async function (receipt) {
        alert(`Transaction ${transactionData.txToConfirm} approved.`)
      })
  }

  const onRevoke = async (e) => {
    e.preventDefault()

    classroomContract.setProvider(window.ethereum)

    await classroomContract.methods
      .revokeConfirmation(transactionData.txToRevoke)
      .send({ from: props.accounts[0] })
      .on('receipt', async function (receipt) {
        alert(`Transaction ${transactionData.txToRevoke} revoked.`)
      })
  }

  const onExecute = async (e) => {
    e.preventDefault()

    classroomContract.setProvider(window.ethereum)

    await classroomContract.methods
      .executeTransaction(transactionData.txToExecute)
      .send({ from: props.accounts[0] })
      .on('receipt', async function (receipt) {
        alert(
          `Transaction ${transactionData.txToExecute} executed. Funds have been distributed.`
        )
      })
  }
  return (
    <div>
      <BackButton url='/enroll' />
      <section className='heading'>
        <h1>{classroomName}</h1>
        <p>Teached by: {email}</p>
      </section>

      <p>
        <b>Address on chain:</b> {params.address}
      </p>
      <p>
        <b>Duration of the course in weeks (sessions):</b> {sessions}
      </p>
      <p>
        <b>Start date:</b> {startDate}
      </p>
      <p>
        <b>Description:</b> {description}
      </p>
      <p>
        <b>Tools we will use:</b> {tools}
      </p>
      <p>
        <b>Balance: {transactionData.balance} ETH</b>
      </p>

      <br />
      <hr />
      <br />

      <section className='buttons'>
        <div className='form-group'>
          <button onClick={onEnroll} className='btn btn-block'>
            Enroll
          </button>
        </div>

        <div className='form-group'>
          <button onClick={onTransaction} className='btn btn-block'>
            Submit Transaction
          </button>
        </div>

        <div className='form-group'>
          <label htmlFor='onConfirm'>
            Transaction number to <b>confirm</b>:{' '}
          </label>
          <input
            id='txToConfirm'
            value={transactionData.txToConfirm}
            onChange={onMutate}
            type='number'
            min='0'
            max={toString(parseInt(sessions) - 1)}
            className='form-control'
          />
          <button onClick={onConfirm} className='btn btn-block'>
            Confirm Transaction
          </button>
        </div>

        <div className='form-group'>
          <label htmlFor='onRevoke'>
            Transaction number to <b>revoke</b>:{' '}
          </label>
          <input
            id='txToRevoke'
            value={transactionData.txToRevoke}
            onChange={onMutate}
            type='number'
            min='0'
            max={toString(parseInt(sessions) - 1)}
            className='form-control'
          />
          <button onClick={onRevoke} className='btn btn-block'>
            Revoke Transaction
          </button>
        </div>

        <div className='form-group'>
          <label htmlFor='onExecute'>
            Transaction number to <b>execute</b>:{' '}
          </label>
          <input
            id='txToExecute'
            value={transactionData.txToExecute}
            onChange={onMutate}
            type='number'
            min='0'
            max={toString(parseInt(sessions) - 1)}
            className='form-control'
          />
          <button onClick={onExecute} className='btn btn-block'>
            Execute Transaction
          </button>
        </div>
      </section>
    </div>
  )
}

export default Classroom
