import React, { memo } from 'react'

import { Layout, Popconfirm, message } from 'antd'
import { HeaderWrapper } from './style'

import logo from '@/assets/img/logo.png';

import { LogoutOutlined } from '@ant-design/icons'
const { Header } = Layout
let username = localStorage.getItem('username')
let role = localStorage.getItem('role')

function confirm(e) {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('username')
    message.error('您已退出');
  }
  
  function cancel(e) {
    message.error('取消退出');
  }
export default memo(function () {
    return (
        <HeaderWrapper>
            <Header style={{height: '12vh'}}>
                <div className='warpper'>
                    <img src={logo} alt='头像图标' className='headerLogo'/>
                    <div className='headerName'>药品商品管理系统</div>
                    <div className='right'>
                        <div className='role'>用户角色：{role===1? '管理员': '普通用户'}</div>
                    </div>
                    <div className='right'>
                        <div className='username'>用户名称：{username}</div>         
                    </div>
                    <div className='logout'>
                         <Popconfirm
                            title="确定要退出吗?"
                            onConfirm={confirm}
                            onCancel={cancel}
                            okText="是"
                            cancelText="否"
                        >
                            <div><LogoutOutlined  className='icons'/></div>
                        </Popconfirm>
                    </div>
                </div>
            </Header>
        </HeaderWrapper>
    )
})
