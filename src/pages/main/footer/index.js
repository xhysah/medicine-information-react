import React, { memo } from 'react'

import { FooterWrapper } from './style'
import { Layout } from 'antd'
const { Footer } = Layout

export default memo(function () {
    return (
        <FooterWrapper>
            <Footer className='footer'>
                Desigend by xhy <span role='img' aria-label='爱心'>❤️</span>
            </Footer>
        </FooterWrapper>
    )
})
