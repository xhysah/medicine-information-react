import React from 'react'
import { Redirect } from 'react-router-dom'

import Login from '@/pages/login'
import NotAllow from '@/pages/notAllow'
import Main from '@/pages/main'
import GoodsManage from '@/pages/goodsManage'
import SalesRecords from '@/pages/salesRecords'
import Statistics from '@/pages/statistics'
import CategoriesStorage from '@/pages/categoriesStorage'
import User from '@/pages/user'

const routes = [
    {
        path: "/",
        exact: true,
        render: () => {
            const token = localStorage.getItem('token')
            return token? <Redirect to='/main/goodsManage'/> : <Redirect to='/login'/>
        }
    },
    {
        path: '/main',
        component: Main,
        routes: [
            {
                path: '/main',
                exact: true,
                render: () =>{
                    const token = localStorage.getItem('token')
                    return token? <Redirect to='/main/goodsManage'/> : <Redirect to='/login'/>
                }
            },
            {
                path: '/main/goodsManage',
                render: () =>{
                    const token = localStorage.getItem('token')
                    return token? <GoodsManage/> : <Redirect to='/login'/>
                }
            },
            {
                path: '/main/salesRecords',
                render: () =>{
                    const token = localStorage.getItem('token')
                    return token? <SalesRecords/> : <Redirect to='/login'/>
                }
            },
            {
                path: '/main/statistics',
                render: () =>{
                    const token = localStorage.getItem('token')
                    return token? <Statistics/> : <Redirect to='/login'/>
                }
            },
            {
                path: '/main/categoriesStorage',
                render: () =>{
                    const token = localStorage.getItem('token')
                    return token? <CategoriesStorage/> : <Redirect to='/login'/>
                }
            },
            {
                path: '/main/user',
                render: () =>{
                    const token = localStorage.getItem('token')
                    return token? <User/> : <Redirect to='/login'/>
                }
            }
        ]
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/404',
        component: NotAllow
    }
]

export default routes