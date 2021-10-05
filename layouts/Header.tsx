import { Layout, Menu, Button } from 'antd'
import { useWallet } from 'use-wallet'

const { Header } = Layout

const HeaderLayout = () => {
    const wallet = useWallet()
    // const { accout, binance, wallet } = useWallet()

    return (
        <Header>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                {new Array(3).fill(null).map((_, index) => {
                    const key = index + 1;
                    return <Menu.Item key={key}>{`nav ${key}`}</Menu.Item>;
                })}
            </Menu>
            <Button 
                type="primary"
                onClick={() => {
                    wallet.connect('injected')
                }}
            >
                Connect MetaMask
            </Button>
        </Header>
    )
}

export default HeaderLayout