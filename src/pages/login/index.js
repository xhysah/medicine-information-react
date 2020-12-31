import React, { memo, useState } from 'react'

import { useHistory } from "react-router-dom";
import { LoginWrapper } from './style'
import { Form, Input, Button, Modal } from 'antd';
import { login } from '@/services/users'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import Register from './register'

export default memo(function (props) {
  //是否显示密码错误标题
  const [flag, setFlag] = useState(false)
  const [form] = Form.useForm()
  // 注册对话框是否展示
  const [isModalVisible, setIsModalVisible] = useState(false);
  let history = useHistory();
  const registerModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const logins = (values) => {
    login(values).then(res=> {
      if(res.status===200){
        // 得到登陆token，存放在localStorage里面
        localStorage.setItem('token', res['token']);
        localStorage.setItem('username', res[0].username)
        localStorage.setItem('role', res[0].role)
        // 重定向到主页面
        history.push('/main')
      }else{
        setFlag(true)
        // 密码错误，重置密码输入框
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
            <Button type='primary' htmlType='submit' style={{width: '300px',height:'40px', marginBottom: '-20px'}}>
              登录
        </Button>
          </Form.Item>
          <Form.Item>
            <Button style={{width: '300px',height:'40px', marginTop:'-10px'}} onClick={registerModal}>
              注册
        </Button>
        <Modal title="注册用户" visible={isModalVisible} footer={null} onCancel={handleCancel}>
          <Register handleCancel={handleCancel}/>
        </Modal>
          </Form.Item>
        </Form>
      </div>
    </LoginWrapper>
  )
})
