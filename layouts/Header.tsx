import { Layout, Button } from 'antd'
// import { useWallet } from 'use-wallet'
import * as bsc from '@binance-chain/bsc-use-wallet'

const { Header } = Layout

const HeaderLayout = () => {
    const wallet = bsc.useWallet()
    const { account, status } = wallet

    return (
        <Header>
            {status === 'connected' && <Button
                type="primary"
                onClick={() => {
                    localStorage.removeItem('walletconnect')
                    wallet.reset()

                }}
            >
                {account}
            </Button>}
            {status !== 'connected' && 
            <>
                <Button
                    type="primary"
                    onClick={() => {
                        // console.log(wallet, 'wallet')
                        wallet.connect('injected')
                    }}
                >
                    Connect MetaMask
                </Button>
                <Button
                    type="primary"
                    onClick={() => {
                        // console.log(wallet, 'wallet')
                        wallet.connect('walletconnect')
                    }}
                >
                    Wallet Connect
                </Button>
            </>
            }
        </Header>
    )
}

export default HeaderLayout