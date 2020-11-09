import React, { memo, useState, useEffect } from 'react'

import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import { getChangeCategoriesAction } from '@/pages/goodsManage/store/actionCreators'

import { Modal, Form, Input, Button, Select, InputNumber } from 'antd';
import Upload  from '@/components/upload'

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
  
  const { alterGoods, text} = props

  function showAddNewCategories() {
    // addCategories()
    setVisible(!visible)
  }
  
  function handleCancel(){
    setVisible(false)
    form.resetFields();
  }
  const onFinish = (values) => {
    
    values.goodsId = text.goodsId
    console.log('Success:', values);
    alterGoods(values)
    setVisible(false)
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const [form] = Form.useForm();
  const fields=[
    {
      "name": [
        "cid"
      ],
      "value": text.cid
    },
    {
      "name": [
        "goodsName"
      ],
      "value": text.goodsName
    },
    {
      "name": [
        "description"
      ],
      "value": text.description
    },
    {
      "name": [
        "price"
      ],
      "value": text.price
    },
    {
      "name": [
        "stocks"
      ],
      "value": text.stocks
    },
    {
      "name": [
        "goodsUrl"
      ],
      "value": text.goodsUrl
    }
  ]
  return (
    <>
      <Button onClick={e => showAddNewCategories()} size='small' type="primary">
      修改
      </Button>
      <Modal
          title='修改商品'
          visible={visible}
          onCancel={e => handleCancel()}
          footer={null}
          maskClosable={false}
        >
        <Form
        form={form}
        fields={fields}
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
            name="goodsUrl"
            label='商品图片'
            rules={[
              {
                required: true,
                message: '请添加商品图片'
              },
            ]}
          >
            <Upload name={`goods/c${cid}`} setImgUrl={form.setFieldsValue} imgUrl='goodsUrl' imgsrc={text.goodsUrl}/> 
          </Form.Item>
          <Form.Item style={{textAlign: "center"}}>
            <Button type="primary" htmlType="submit" className='button' style={{margin:'0 20px'}}>
                确定
            </Button>
            <Button className='button' onClick={handleCancel}>取消</Button>
        </Form.Item>
        </Form>
      </Modal>
    </>
  )
})
