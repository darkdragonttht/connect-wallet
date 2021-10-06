import type { NextPage } from 'next'
import { useEffect, useState } from "react"
import styles from '../styles/Home.module.css'
import { getBusdContractRead, getBusdContractWrite } from "../contract/getContract"
import TokenAmount from "token-amount"
import { message, Input, Button } from 'antd'
import Web3 from 'web3'
import { useWallet } from 'use-wallet'


const Home: NextPage = () => {
    const wallet = useWallet()
    const { account, status } = wallet

    const [balanceBusd, setBlanceBusd] = useState(0)
    const [address, setAddress] = useState('')
    const [amount, setAmount] = useState('')
    const [contractWrite, setContractWrite] = useState({})

    const contract = getBusdContractRead()

    useEffect(() => {

        const init = async () => {
            if (contract && account) {
                const balance = await (await contract).methods.balanceOf(account).call()
                setBlanceBusd(balance)
            }
            const contractWrite = await getBusdContractWrite()
            setContractWrite(contractWrite)
        }
        init()
    }, [account])

    const sendBusd = async () => {
        if (contractWrite) {
            // @ts-ignore
            contractWrite.methods.transfer(address, Web3.utils.toWei(amount)).send({ from: account })
                .then(async (txHash: any) => {
                    message.success(txHash.transactionHash)
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
