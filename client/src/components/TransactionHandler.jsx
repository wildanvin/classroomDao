import React from 'react'
import { useEffect, useState } from 'react'

import ClassroomContract from '../contracts/Classroom.json'
import Web3 from 'web3'

function TransactionHandler(props) {
  const [txCount, setTxCount] = useState(0)
  const [txSelected, setTxSelected] = useState(0)
  const [txState, setTxState] = useState({
    0: false,
    1: '0',
    executed: false,
    numConfirmations: '0',
  })

  useEffect(() => {
    async function getTx() {
      const web3 = new Web3(window.ethereum)
      const classroomContract = new web3.eth.Contract(
        ClassroomContract.abi,
        props.address
      )

      classroomContract.setProvider(window.ethereum)

      try {
        let txCounting = await classroomContract.methods
          .getTransactionCount()
          .call()
        //console.log(`Number of transactions: ${txCount}`)
        if (txCounting > 0) {
          setTxCount(txCounting)
          let txStateVar = await classroomContract.methods
            .getTransaction(0)
            .call()

          setTxState(txStateVar)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getTx()
  }, [])

  const txArr = []

  if (txCount > 0) {
    for (let i = 0; i <= txCount - 1; i++) {
      txArr.push(i)
    }
  }

  const web3 = new Web3(window.ethereum)
  const classroomContract = new web3.eth.Contract(
    ClassroomContract.abi,
    props.address
  )

  classroomContract.setProvider(window.ethereum)

  const txChangeHandler = async (e) => {
    setTxSelected(e.target.value)

    classroomContract.setProvider(window.ethereum)
    try {
      let txStateVar = await classroomContract.methods
        .getTransaction(e.target.value)
        .call()

      setTxState(txStateVar)
      //console.log(txStateVar)
    } catch (error) {
      console.log(error)
    }
  }

  const onConfirm = async (e) => {
    e.preventDefault()

    classroomContract.setProvider(window.ethereum)

    await classroomContract.methods
      .confirmTransaction(txSelected)
      .send({ from: props.accounts[0] })
      .on('receipt', async function (receipt) {
        alert(`Transaction ${txSelected} has been confirmed.`)
      })
  }

  const onRevoke = async (e) => {
    e.preventDefault()

    classroomContract.setProvider(window.ethereum)

    await classroomContract.methods
      .revokeConfirmation(txSelected)
      .send({ from: props.accounts[0] })
      .on('receipt', async function (receipt) {
        alert(`Transaction ${txSelected} has been revoked.`)
      })
  }

  const onExecute = async (e) => {
    e.preventDefault()

    classroomContract.setProvider(window.ethereum)

    await classroomContract.methods
      .executeTransaction(txSelected)
      .send({ from: props.accounts[0] })
      .on('receipt', async function (receipt) {
        alert(
          `Transaction ${txSelected} executed. Funds have been distributed.`
        )
      })
  }

  if (txCount === 0) {
    return (
      <>
        <div>
          No transactions have been submitted. Use the Submit button to create a
          Transaction
        </div>
        <br />
        <br />
        <br />
      </>
    )
  }

  return (
    <>
      <div className='form-group'>
        <label htmlFor='product'>Select Transaction Number:</label>
        <select name='tx' id='tx' value={txSelected} onChange={txChangeHandler}>
          {txArr.map((tx) => (
            <option key={tx} value={tx}>
              {tx}
            </option>
          ))}
        </select>
      </div>

      <div className='form-group'>
        <p>
          Transaction {txSelected} has {txState.numConfirmations} confirmations
        </p>
        <p>
          Transaction {txSelected} has{' '}
          <b>{txState.executed ? 'been' : 'not been'}</b> executed
        </p>
      </div>
      <div className='form-group'>
        <button onClick={onConfirm} className='btn btn-block'>
          Confirm Transaction #{txSelected}
        </button>
      </div>

      <div className='form-group'>
        <button onClick={onRevoke} className='btn btn-block'>
          Revoke Transaction #{txSelected}
        </button>
      </div>

      <div className='form-group'>
        <button onClick={onExecute} className='btn btn-block'>
          Execute Transaction #{txSelected}
        </button>
        <br />
        <br />
      </div>
    </>
  )
}

export default TransactionHandler
