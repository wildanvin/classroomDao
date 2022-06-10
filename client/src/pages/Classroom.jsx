import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import BackButton from '../components/BackButton'
import TransactionHandler from '../components/TransactionHandler'

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
      let locally = `http://localhost:5000/classrooms/${params.address}`
      let vercelApi = 'https://api-fawn-delta.vercel.app/api/classrooms'
      let INPROD = true

      if (INPROD) {
        const response = await fetch(vercelApi)
        const data = await response.json()
        const selectedClassroom = data.classrooms.filter((object) => {
          return object.id == params.address
        })
        //console.log(selectedClassroom[0])
        setClassroomData(selectedClassroom[0])
      } else {
        const response = await fetch(locally)
        const data = await response.json()
        //console.log(data)
        setClassroomData(data)
      }
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

    async function getTransactionCount() {
      try {
        let txCount = await classroomContract.methods
          .getTransactionCount()
          .call()
        //console.log(`Number of transactions: ${txCount}`)
        setTransactionData((prevState) => ({
          ...prevState,
          txCount: txCount,
        }))
      } catch (error) {
        console.log(error)
      }
    }

    getTransactionCount()
  }

  return (
    <>
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

        <hr />
        <br />

        <div className='form-group'>
          <button onClick={onTransaction} className='btn btn-block'>
            Submit Transaction
          </button>
        </div>

        <hr />
        <br />

        {/* <TransactionHandler
          address={params.address}
          accounts={props.accounts}
          txCount={0}
        /> */}

        <TransactionHandler
          address={params.address}
          accounts={props.accounts}
        />
      </section>
    </>
  )
}

export default Classroom
