import React, { memo, useState } from 'react'

import { Modal, Form, Input, Button, message } from 'antd';
import { useDispatch } from 'react-redux'
import Upload  from '@/components/upload'
import { PlusOutlined } from '@ant-design/icons';
import { AddCategoryWrapper } from './../../style';
import { getChangeCategoriesAction } from '@/pages/goodsManage/store/actionCreators'


export default memo(function (props) {
  const [visible, setVisible] = useState(false)
  
  const { addCategories } = props

  function showAddNewCategories() {
    // addCategories()
    setVisible(!visible)
  }
  
  function handleCancel(){
    setVisible(false)
    form.resetFields();
  }
  const dispatch = useDispatch()

  const onFinish = (values) => {
    console.log('Success:', values);
    addCategories(values)
    setVisible(false)
    dispatch(getChangeCategoriesAction()) 
    message.success('添加分类成功');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const [form] = Form.useForm();
  return (
    <AddCategoryWrapper>
      <Button type="primary" icon={<PlusOutlined />} onClick={e => showAddNewCategories()}>
      添加分类
      </Button>
      <Modal
          title='添加分类'
          visible={visible}
          onCancel={e => handleCancel()}
          footer={null}
          maskClosable={false}
        >
        <Form
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}>
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
            <Input/>
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
            <Upload name={'categories'} setImgUrl={form.setFieldsValue} imgUrl='imgUrl' /> 
          </Form.Item>
          <Form.Item style={{textAlign: "center"}}>
            <Button type="primary" htmlType="submit" className='button' style={{margin:'0 20px'}}>
                确定
            </Button>
            <Button className='button' onClick={handleCancel}>取消</Button>
        </Form.Item>
        </Form>
      </Modal>
    </AddCategoryWrapper>
  )
})
