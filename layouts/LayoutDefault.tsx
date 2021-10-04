import React from 'react'
import HeaderLayout from './Header'

interface LayoutProps {
    children: any
}

const LayoutDefault: React.FC<LayoutProps> = ({children}) => {
    return (
        <>
            <HeaderLayout />
            <main>{children}</main>
        </>
    )
}

export default LayoutDefault