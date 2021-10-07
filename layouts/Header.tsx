import { Layout, Button } from 'antd'
import { useWallet } from 'use-wallet'

const { Header } = Layout

const HeaderLayout = () => {
    const wallet= useWallet()
    const { account, status } = wallet

    return (
        <Header>
            {status === 'connected' && <Button
                type="primary"
                onClick={() => {
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
                        wallet.connect('injected')
                    }}
                >
                    Connect MetaMask
                </Button>
                <Button
                    type="primary"
                    onClick={() => {
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