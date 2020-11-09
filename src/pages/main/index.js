import React, { memo } from 'react'
import { renderRoutes } from 'react-router-config';

import XHYHeader from './header'
import XHYFooter from './footer'
import XHYSider from './sider'

import { Layout } from 'antd';
const { Content } = Layout;

export default memo(function index(props) {
    return (
        <div>
            <XHYHeader />
            <Layout>
                <XHYSider />
                <Content>
                    {renderRoutes(props.route.routes)}
                </Content>
            </Layout>
            <XHYFooter />
        </div>
    )
})
