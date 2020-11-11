import React, { memo, useState } from 'react'

import { useHistory } from "react-router-dom";
import { LoginWrapper } from './style'
import { Form, Input, Button } from 'antd';
import { login } from '@/services/users'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

export default memo(function (props) {
  const [ flag, setFlag] = useState(false)
  const [form] = Form.useForm()
  let history = useHistory();
  const logins = (values) => {
    login(values).then(res=> {
      if(res.status===200){
        console.log(res);
        localStorage.setItem("token",res['token']);
        history.push('/main')
      }else{
        setFlag(true)
        form.resetFields(['password'])
      }
    })
  }
  return (
    <LoginWrapper>
      <div className='login'>
        <div className='header'>药品管理系统</div>
        <Form onFinish={logins} className='form' form={form}>
          <span style={{display: flag? 'inline': 'none'}} className='error'>账号或密码错误</span>
          <Form.Item
            name='username'
            rules={[{ required: true, message: '请输入账号名' }]}
          >
            <Input allowClear={true} placeholder='用户名' className='input' size="large" prefix={<UserOutlined />}/>
          </Form.Item>

          <Form.Item
            name='password'
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password placeholder='密码' className='input' size="large" prefix={<LockOutlined />}/>
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' style={{width: '300px',height:'40px'}}>
              登录
        </Button>
          </Form.Item>
        </Form>
      </div>
    </LoginWrapper>
  )
})
