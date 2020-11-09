import React, { memo, useState } from 'react'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'

import { changeAddShoppingListAction } from '../store/actionCreators'
import { addOrders, updateOrders } from '@/services/orders'
import { addOrderDetails } from '@/services/orderDetails'

import { Modal, Form, Input, Select, Button } from 'antd'
import { CloseOutlined } from '@ant-design/icons'

import { ShoppingCartWrapper } from './style'
export default memo(function () {
  const [payWay, setPayWay] = useState(0);
  const [fields, setFields] = useState();
  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm();
  const dispatch = useDispatch()
  const { shoppingCartList } = useSelector(state => ({
    shoppingCartList: state.get('goodsManage').get('shoppingCartList')
  }),shallowEqual)

  // 改变库存信息
  function changeGoodsListBystocks(goods, num, index){
    const result = [...goods.goodsList]
    const value = result[goods.index][goods.indexs].stocks
    if(value-num<0){
      return
    }else{
      changeValue(goods, index)
      result[goods.index][goods.indexs].stocks = value - num
      goods.setGoodsList(result)
    }
  }

  // 输入商品数量
  // function changeNum(e,index){
  //   const values = Number(e.target.value)
  //   console.log(values);
  //   const goods = {...shoppingCartList[index], num: values}
  //   changeGoodsListBystocks(goods, values, index)
  // }
  // 增加一个商品
  function increment(index){
    const values = shoppingCartList[index].goodsNum+1
    const goods = {...shoppingCartList[index], goodsNum: values}
    changeGoodsListBystocks(goods, 1,index)
  }

  // 减少一个商品
  function decrement(index){
    const values = shoppingCartList[index].goodsNum-1
    var goods ;
    if(values === 0){
      const newList = [...shoppingCartList]
      goods = newList[index]
      newList.splice(index, 1)
      changeGoodsListBystocks(goods, -1, index)
      dispatch(changeAddShoppingListAction(newList))
    }else{
      goods = {...shoppingCartList[index], goodsNum: values}
      changeGoodsListBystocks(goods, -1,index)
    }
  }

  // 统一的改变购物车的方法
  function changeValue(goods, index) {
    const newList = [...shoppingCartList]
    newList[index] = goods
    dispatch(changeAddShoppingListAction(newList))
  }
  function confirm() {
    updateOrders({
      orderNum: form.getFieldValue('orderNum'),
      orderStatus:1,
      payWay,
      shoppingCartList
    })
    setVisible(false)
    dispatch(changeAddShoppingListAction([]))
  }

  function check(){
    setVisible(true)
   
    addOrders({
      totalPrice,
      totalNum: shoppingCartList.length
    }).then(res =>{ 
      addOrderDetails(shoppingCartList, res.orderNum)
      console.log(shoppingCartList)
      setFields([
        {name:['orderNum'],value: res.orderNum},
        {name:['totalPrice'],value: res.totalPrice},
        {name:['totalNum'],value: res.totalNum}
      ])
    })
  }
  // 移除一个商品
  function remove(index){
    const list = [...shoppingCartList]
    const goods = list[index]
    list.splice(index,1)
    // 将库存信息恢复到原来
    changeGoodsListBystocks(goods, -goods.goodsNum, index)
    // 从购物车里移除一个商品
    dispatch(changeAddShoppingListAction(list))
  }

  // 计算商品总价
  const totalPrice = shoppingCartList.reduce((pre,cur)=>{
    return pre + cur.goodsNum*cur.price
    },0)
  return (
    <ShoppingCartWrapper ifShow={shoppingCartList.length>0?'block':'none'}>
      {shoppingCartList.map((item, index) =>{
        return (
          <div key={item.goodsId} className='good'>
            <img  src={item.goodsUrl} alt={item.goodsName}/>
            <CloseOutlined className='close' onClick={e=>remove(index)}/>
            <span className='goodsName'>{item.goodsName}</span>
            <span className='price'>¥{item.price}</span>
            <div className='button'>
            <button  className='button1' onClick={e=>decrement(index)} disabled={item.goodsNum<=1}>-</button>
            <input value={item.goodsNum} className='input'readOnly type='number'/>
            <button  className='button2' onClick={e =>increment(index)} disabled={item.goodsNum-1===item.stocks}>+</button>
            </div>
          </div>
        )
      })}
      <div className='footer'>
        <span className='all'>
          合计：¥{totalPrice}
        </span>
        <span  className='num' onClick={e=>check()}>
          结算(<span>{shoppingCartList.length}</span>)
        </span>
        <Modal
          title='订单'
          visible={visible}
          footer={null}
          maskClosable={false}
          closable={false}
        >
          <Form
          form={form}
          fields={fields}
          >
            <Form.Item
              name='orderNum'
              label='订单编号'
            >
              <Input/>
            </Form.Item>
            <Form.Item
              name='totalPrice'
              label='商品总价'
            >
              <Input/>
            </Form.Item>
            <Form.Item
              name='totalNum'
              label='商品总数'
            >
              <Input/>
            </Form.Item>
            <Form.Item
              name='payWay'
              label='支付方式'
              rules={[
                {
                  required: true,
                  message: '请选择支付方式'
                },
              ]}
            >
              <Select onChange={(value) => setPayWay(value)}>
                <Select.Option  value={1}>微信支付</Select.Option>
                <Select.Option  value={2}>支付宝支付</Select.Option>
                <Select.Option  value={3}>现金支付</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item style={{textAlign: "center"}}>
            <Button type="primary" htmlType="submit" style={{margin:'0 20px'}} onClick={e => confirm()}>
                确定
            </Button>
        </Form.Item>
          </Form>
        </Modal>
      </div> 
    </ShoppingCartWrapper>
  )
})
