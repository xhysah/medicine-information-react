import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'

import { SiderWrapper } from './style'

import { Layout, Menu } from 'antd'
const { Sider }  = Layout

function XHYSider(props) {
    return (
        <SiderWrapper>
            <Sider>
                <Menu 
                className='menu'
                defaultSelectedKeys={['/goodsManage']}>
                    <Menu.Item key='/goodsManage' style={{marginTop:'0'}}><NavLink to='/main/goodsManage'>商品管理</NavLink></Menu.Item>
                    <Menu.Item key='/categoriesStorage'><NavLink to='/main/categoriesStorage'>入库管理</NavLink></Menu.Item>
                    <Menu.Item key='/salesRecords'><NavLink to='/main/salesRecords'>销售记录</NavLink></Menu.Item>
                    <Menu.Item key='/statistics'><NavLink to='/main/statistics'>统计记录</NavLink></Menu.Item>
                </Menu>
            </Sider>
        </SiderWrapper>
    )
}

export default memo(XHYSider)