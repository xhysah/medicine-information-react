import React, { memo, useState } from 'react'
import { Form, Input, Button, Select, message} from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { registers } from '@/services/users'
const { Option } = Select;

export default memo(function (props) {
  // 判断密码不一致是否显示
  const { handleCancel } = props
  const [role, setRole] = useState()
  const [form] = Form.useForm()

  const register = (values) => {
    registers(values,role).then(res =>{
      if(res.status === 200){
        message.success('注册成功')
        handleCancel()
        form.resetFields()
      }else{
        message.error('昵称已占用')
        form.resetFields(['username'])
      }
      
    })
  }
  function handleChange(value) {
    setRole(value)
  }
  return (
    <div>
      <Form onFinish={register} className='form' form={form}>
          <Form.Item
            name='username'
            rules={[{ required: true, message: '请输入账号名' }]}
          >
            <Input allowClear={true} placeholder='用户名' className='input' size="large" prefix={<UserOutlined />}/>
          </Form.Item>
          <Form.Item
            name='role'
            rules={[{ required: true, message: '请选择角色属性账号名' }]}
          >
            <Select onChange={handleChange}>
              <Option value="1">管理员</Option>
              <Option value="2">普通用户</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name='password1'
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password placeholder='密码' className='input' size="large" prefix={<LockOutlined />} />
          </Form.Item>
          <Form.Item
            name='password2'
            dependencies={['password1']}
            rules={[{ required: true, message: '请输入密码' },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password1') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('请与第一次填写的密码保持一致');
              },
            }),]}
          >
            <Input.Password placeholder='确认密码'  className='input' size="large" prefix={<LockOutlined />}/>
          </Form.Item>
          <Form.Item>
            <div style={{textAlign: 'center'}}>
              <Button type='primary' htmlType='submit' style={{width: '300px',height:'40px'}}>
              确定
            </Button>
          </div>
          </Form.Item>
        </Form>
    </div>
  )
})
