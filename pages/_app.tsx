import React from 'react'
import * as bsc from '@binance-chain/bsc-use-wallet'
import { UseWalletProvider } from '@binance-chain/bsc-use-wallet'
import 'antd/dist/antd.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import LayoutDefault from '../layouts/LayoutDefault'

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <Providers>
            <LayoutDefault>
                <Component {...pageProps} />
            </LayoutDefault>
        </Providers>
    )
}

const Providers: React.FC = ({ children }) => {
    return (
        <UseWalletProvider
            chainId={97}
            connectors={{
                bsc,
                walletconnect: {
                    rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/'
                }
            }}
        >
            {children}
        </UseWalletProvider>
    )
}

export default MyApp
