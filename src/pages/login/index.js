import React, { memo } from 'react'

import { useHistory } from "react-router-dom";
import { LoginWrapper } from './style'
import { Form, Input, Button, Checkbox } from 'antd';
import { login } from '@/services/users'

export default memo(function (props) {
  let history = useHistory();
  const logins = (values) => {
    login(values).then(res=> {
      if(res.status===200){
        history.push('/main')
      }
    })
  }
  return (
    <LoginWrapper>
      <div className='login'>
        <div className='header'>收银系统登陆</div>
        <Form onFinish={logins}>
          <Form.Item
            name='username'
            rules={[{ required: true, message: '请输入账号名' }]}
          >
            <Input allowClear={true} placeholder='用户名'/>
          </Form.Item>

          <Form.Item
            name='password'
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password placeholder='密码'/>
          </Form.Item>

          <Form.Item name='remember' valuePropName='checked'>
            <Checkbox>记住密码</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit'>
              登录
        </Button>
          </Form.Item>
        </Form>
      </div>
    </LoginWrapper>
  )
})
