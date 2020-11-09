import React from 'react'
import { Redirect } from 'react-router-dom'

import Login from '@/pages/login'
import NotAllow from '@/pages/notAllow'
import Main from '@/pages/main'
import GoodsManage from '@/pages/goodsManage'
import SalesRecords from '@/pages/salesRecords'
import Statistics from '@/pages/statistics'
import CategoriesStorage from '@/pages/categoriesStorage'


const routes = [
    {
        path: "/",
        exact: true,
        render: () => (
          <Redirect to='/login'/>
        )
    },
    {
        path: '/main',
        component: Main,
        routes: [
            {
                path: '/main',
                exact: true,
                render: () =>(
                    <Redirect to='/main/goodsManage'/>
                )
            },
            {
                path: '/main/goodsManage',
                component: GoodsManage
            },
            {
                path: '/main/salesRecords',
                component: SalesRecords
            },
            {
                path: '/main/statistics',
                component: Statistics
            },
            {
                path: '/main/categoriesStorage',
                component: CategoriesStorage
            }
        ]
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/notAllow',
        component: NotAllow
    }
]

export default routes