import { Layout, Menu, Button } from 'antd'

const { Header } = Layout

const HeaderLayout = () => {
    return (
        <Header>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                {new Array(3).fill(null).map((_, index) => {
                    const key = index + 1;
                    return <Menu.Item key={key}>{`nav ${key}`}</Menu.Item>;
                })}
            </Menu>
            <Button type="primary">Connect Wallet</Button>

        </Header>
    )
}

export default HeaderLayout