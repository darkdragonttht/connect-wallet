import type { NextPage } from 'next'
import { useEffect, useState } from "react"
import styles from '../styles/Home.module.css'
import { getBusdContractRead, getBusdContractWrite } from "../contract/getContract"
import TokenAmount from "token-amount"
import { message, Input, Button } from 'antd'
import Web3 from 'web3'
import { useWallet } from 'use-wallet'
import * as bsc from '@binance-chain/bsc-use-wallet'

const Home: NextPage = () => {
    const wallet = bsc.useWallet()
    const { account, status } = wallet
    const [balanceBusd, setBlanceBusd] = useState(0)
    const [address, setAddress] = useState('')
    const [amount, setAmount] = useState('')
    const [contractWrite, setContractWrite] = useState({})
    const contract = getBusdContractRead()
    const [listTranfer, setTranfer] = useState([])

    useEffect(() => {
        const init = async () => {
            if (contract && account) {
                const balance = await (await contract).methods.balanceOf(account).call()
                setBlanceBusd(balance)
            }
            const contractWrite = await getBusdContractWrite()
            await getHistory()
            await setContractWrite(contractWrite)
        }
        init()
    }, [account])

    const getHistory = () => {
        if (localStorage.getItem('transaction_' + account) !== null) {
            let resultHistory: any = localStorage.getItem('transaction_' + account)
            resultHistory = JSON.parse(resultHistory)
            setTranfer(resultHistory)
        } else {
            setTranfer([])
        }

    }

    const setTransaction = (transaction: any) => {
        if (localStorage.getItem('transaction_' + account) !== null) {
            let result: any = localStorage.getItem('transaction_' + account)
            result = JSON.parse(result)
            result.unshift(transaction)
            localStorage.setItem('transaction_' + account, JSON.stringify(result))
            setTranfer(result)
        } else {
            let result: any = [transaction]
            localStorage.setItem('transaction_' + account, JSON.stringify(result))
        }
    }

    const sendBusd = async () => {
        if (contractWrite) {
            // @ts-ignore
            contractWrite.methods.transfer(address, Web3.utils.toWei(amount)).send({ from: account })
                .then(async (txHash: any) => {
                    message.success(txHash.transactionHash)
                    setTransaction(txHash)
                    const balance = await (await contract).methods.balanceOf(account).call()
                    setBlanceBusd(balance)
                }).catch((err: any) => {
                    message.error(err.toString())
                });
        } else {
            message.error('Error');
        }
    }

    return (
        <div className={styles.container}>
            {status === 'connected' &&
                <>
                    {new TokenAmount(balanceBusd, 18, { symbol: 'BUSD' }).format()}
                    <Input
                        placeholder="address"
                        onChange={e => setAddress(e.target.value)}
                    />
                    <Input placeholder="amount" onChange={e => setAmount(e.target.value)} />
                    <Button type="primary" onClick={sendBusd}>Send busd</Button>
                    <p>History</p>
                    <ul>
                        {listTranfer.map((obj: any) => {
                            return <li key={obj.transactionHash} ><a href={`https://testnet.bscscan.com/tx/${obj.transactionHash}`} target="_blank">{obj.transactionHash}</a></li>
                        })

                        }
                    </ul>
                </>
            }

            {status !== 'connected' &&
                <>
                    Please connect wallet
                </>
            }
        </div>
    )
}

export default Home
