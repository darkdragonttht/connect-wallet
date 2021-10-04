
import 'antd/dist/antd.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import LayoutDefault from '../layouts/LayoutDefault'


const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <LayoutDefault>
            <Component {...pageProps} />
        </LayoutDefault>
    )
}
export default MyApp
