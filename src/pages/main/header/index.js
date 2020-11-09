import React, { memo } from 'react'

import { Layout } from 'antd'
import { HeaderWrapper } from './style'

import logo from '@/assets/img/logo.png';
const { Header } = Layout


export default memo(function () {
    return (
        <HeaderWrapper>
            <Header>
                <img src={logo} alt='头像图标' className='headerLogo'/>
                <div className='headerName'>小熊的杂货铺</div>
            </Header>
        </HeaderWrapper>
    )
})
