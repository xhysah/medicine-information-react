import React, { memo } from 'react'

import { Layout } from 'antd'
import { HeaderWrapper } from './style'

import logo from '@/assets/img/logo.png';
const { Header } = Layout
let username = localStorage.getItem('username')
let role = localStorage.getItem('role')

export default memo(function () {
    return (
        <HeaderWrapper>
            <Header style={{height: '100px'}}>
                <div className='warpper'>
                    <img src={logo} alt='头像图标' className='headerLogo'/>
                    <div className='headerName'>药品商品管理系统</div>
                    <div className='right'>
                        <div className='role'>用户角色：{role===1? '管理员': '普通用户'}</div>
                    </div>
                    <div className='right'>
                        <div className='username'>用户名称：{username}</div>         
                    </div>
                </div>
            </Header>
        </HeaderWrapper>
    )
})
