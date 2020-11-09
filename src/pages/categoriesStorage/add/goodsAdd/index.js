import React, { memo, useState, useEffect } from 'react'

import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import { getChangeCategoriesAction } from '@/pages/goodsManage/store/actionCreators'

import { Modal, Form, Input, Button, Select, InputNumber, message } from 'antd';
import Upload  from '@/components/upload'
import { PlusOutlined } from '@ant-design/icons';
import { AddCategoryWrapper } from './../../style'


export default memo(function (props) {
  const { categories } = useSelector(state => ({
    categories: state.get('goodsManage').get('categories')
  }),shallowEqual)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getChangeCategoriesAction()) 
  },[dispatch])
  const [visible, setVisible] = useState(false)
  const [cid, setCid] = useState(false)
  
  const { addGoods } = props

  function showAddNewCategories() {
    // addCategories()
    setVisible(!visible)
  }
  
  function handleCancel(){
    setVisible(false)
    form.resetFields();
    setCid(false)
  }
  const onFinish = (values) => {
    console.log('Success:', values);
    addGoods(values)
    setVisible(false)
    setCid(false)
    form.resetFields();
    message.success('添加商品成功');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const [form] = Form.useForm();
  return (
    <AddCategoryWrapper>
       <Button icon={<PlusOutlined />} onClick={e => showAddNewCategories()}>
       添加商品
      </Button>
      <Modal
          title='添加商品'
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
            name='cid'
            label='商品分类'
            rules={[
              {
                required: true,
                message: '请填写商品分类'
              },
            ]}
          >
           <Select allowClear={true}
           onChange={(value)=> setCid(value)}
           >
           {categories.map(item => {
             return (
              <Select.Option key={item.cid} value={item.cid}>{item.cname}</Select.Option>
             )
           })}
          </Select>
          </Form.Item>
          <Form.Item
            name='goodsName'
            label='商品名称'
            rules={[
              {
                required: true,
                message: '请添加商品名称'
              },
            ]}
          >
            <Input allowClear={true}/>
          </Form.Item>
          <Form.Item
            name='description'
            label='商品描述'
            rules={[
              {
                required: true,
                message: '请填写商品描述'
              },
            ]}
          >
            <Input allowClear={true}/>
          </Form.Item>
          <Form.Item
            name='price'
            label='商品价格'
            rules={[
              {
                required: true,
                message: '请填写商品价格'
              },
            ]}
          >
             <Input allowClear={true}/>
          </Form.Item>
          <Form.Item
            name='stocks'
            label='商品库存'
            rules={[
              {
                required: true,
                message: '请填写商品库存'
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            style={{display: cid?'flex':'none'}}
            name="goodsUrl"
            label='商品图片'
            rules={[
              {
                required: true,
                message: '请添加商品图片'
              }
            ]}
          >
            <Upload name={`goods/c${cid}`} setImgUrl={form.setFieldsValue} imgUrl='goodsUrl'/> 
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
