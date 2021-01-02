import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'

import { SiderWrapper } from './style'

import { Layout, Menu } from 'antd'
import { PieChartOutlined, FormOutlined, BarChartOutlined, ShopOutlined, UserOutlined } from '@ant-design/icons'

const { Sider }  = Layout


function XHYSider(props) {
    let role = localStorage.getItem('role')
    return (
        <SiderWrapper>
            <Sider
            style={{
                height: '88vh',
              }}>
                <Menu 
                className='menu'
                defaultSelectedKeys={['/goodsManage']}>
                    <Menu.Item key='/goodsManage' style={{marginTop:'0'}} icon={<ShopOutlined  className='icon'/>}><NavLink to='/main/goodsManage'>商品管理</NavLink></Menu.Item>
                    <Menu.Item key='/categoriesStorage' icon={<FormOutlined className='icon'/>} style={{display: role==='1'?'block':'none'}}><NavLink to='/main/categoriesStorage' >入库管理</NavLink></Menu.Item>
                    <Menu.Item key='/salesRecords' icon={<BarChartOutlined className='icon'/>}><NavLink to='/main/salesRecords'>销售记录</NavLink></Menu.Item>
                    <Menu.Item key='/statistics' icon={<PieChartOutlined className='icon'/>}><NavLink to='/main/statistics'>统计记录</NavLink></Menu.Item>
                    <Menu.Item key='/user' icon={<UserOutlined className='icon'/>} style={{display: role==='1'?'block':'none'}}><NavLink to='/main/user'>用户管理</NavLink></Menu.Item>
                </Menu>
            </Sider>
        </SiderWrapper>
    )
}

export default memo(XHYSider)