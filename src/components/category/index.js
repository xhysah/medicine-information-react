import React, { memo, useState } from 'react'

import { CategoryWrapper } from './style';
import { Modal, Form, Input, Button, message, Card } from 'antd';
import Upload  from '@/components/upload'

import { EditOutlined } from '@ant-design/icons'

export default memo(function (props) {
  const [visible, setVisible] = useState(false)
  const { category, editCategories } = props
  
  function handleCancel(){
    setVisible(false)
    form.resetFields();
  }
  const onFinish = (values) => {
    console.log('Success:', values);
    editCategories({...values, cid: category.cid})
    setVisible(false)
    message.success('修改分类成功');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const [form] = Form.useForm();
  function editCategory(){
    setVisible(true)
  }
  const fields=[
    {
      "name": [
        "cname"
      ],
      "value": category.cname
    },
    {
      "name": [
        "description"
      ],
      "value": category.description
    },
    {
      "name": [
        "imgUrl"
      ],
      "value": category.imgUrl
    }
  ]
  return (
    <CategoryWrapper>
      <Card style={{width: '240px', height: '260px'}}>
        <EditOutlined className='close' onClick={e =>editCategory()}/>
        <img src={category.imgUrl} alt={category.cname}/>
        <div>{category.cname}</div>
      </Card>
      <Modal
          title='修改分类'
          visible={visible}
          onCancel={e => handleCancel()}
          footer={null}
          maskClosable={false}
        >
        <Form
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        fields={fields}>
          <Form.Item
            name='cname'
            label='分类名称'
            rules={[
              {
                required: true,
                message: '请添加分类名称'
              },
            ]}
          >
            <Input allowClear={true}/>
          </Form.Item>
          <Form.Item
            name='description'
            label='分类描述'
            rules={[
              {
                required: true,
                message: '请填写分类描述'
              },
            ]}
          >
            <Input allowClear={true}/>
          </Form.Item>
          <Form.Item
            name="imgUrl"
            label='分类图片'
            rules={[
              {
                required: true,
                message: '请添加分类图片'
              },
            ]}
          >
            <Upload name={'categories'} setImgUrl={form.setFieldsValue} imgUrl='imgUrl'  imgsrc={category.imgUrl}/> 
          </Form.Item>
          <Form.Item style={{textAlign: "center"}}>
            <Button type="primary" htmlType="submit" className='button' style={{margin:'0 20px'}}>
                确定
            </Button>
            <Button className='button' onClick={handleCancel}>取消</Button>
        </Form.Item>
        </Form>
      </Modal>
    </CategoryWrapper>
  )
})
