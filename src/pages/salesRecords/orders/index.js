import React, { memo, useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { getOrderListAction } from '../store/actionCreators'
import { searchOrdersDetails } from '@/services/orderDetails'
import { updateOrders } from '@/services/orders'

import { Table, Button, Modal, message, Form, Input, Select, Tag } from 'antd'

export default memo(function () {
  const [data, setData] = useState({})
  const [visible, setVisible] = useState(false)
  const [orderNum, setOrderNum] = useState()
  const [form] = Form.useForm();
  const [payWay, setPayWay] = useState(0);
  const [fields, setFields] = useState();
  const { ordersList } = useSelector( state =>({
    ordersList: state.get('salesRecords').get('ordersList')
  }),shallowEqual)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getOrderListAction())
  }, [dispatch])

  useEffect(()=>{
    if(orderNum !== undefined && data[orderNum] === undefined){
      searchOrdersDetails(orderNum).then(res =>{
        // setData(res)
        const items = res.map((item, index) => {
          return { ...item, key: index }
        })
        const dataM = {...data}
        dataM[orderNum]= items
        setData(dataM)
        
      })
    }
  })
  
  function handleCancel(){
    setVisible(false)
  }

  function change( expanded, record){
    if(expanded && typeof record.orderNum !== undefined){
      setOrderNum(record.orderNum)
    }
  }
  const ordersListKey = ordersList.map((item, index) => {
    return { ...item, key: index }
  })
  

  function confirm(){
    console.log(form.getFieldValue('orderNum'), payWay)
    console.log(data);
    updateOrders({
      orderNum: form.getFieldValue('orderNum'),
      orderStatus:1,
      payWay,
      shoppingCartList: data[form.getFieldValue('orderNum')]
    })
    dispatch(getOrderListAction())
    message.success('支付成功');
    setVisible(false)
  }

  function pay (res){
    setVisible(true)
    setFields([
      {name:['orderNum'],value: res.orderNum},
      {name:['totalPrice'],value: res.totalPrice},
      {name:['totalNum'],value: res.totalNum}
    ])
  }
  function expandedRowRender(record, index, indent, expanded) {
    const columns = [
      {
        className:'colums',
        title: '商品名称',
        dataIndex: 'goodsName',
        ellipsis: true,
        align: 'center',
        key: 'goodsName',
        render: text => <div>{text}</div>,
      },
      {
        className:'imgUrl',
        ellipsis: true,
        align: 'center',
        title: '商品图片',
        dataIndex: 'imgUrl',
        key: 'imgUrl',
        render: text => <img src={text} alt={text} style={{width:'50px', height: '50px'}}/>,
      },
      {
        className:'price',
        title: '商品价格',
        align: 'center',
        dataIndex: 'price',
        key: 'price',
        render: text => <div>¥{text}</div>,
      },
      {
        className:'goodsNum',
        title: '商品数量',
        align: 'center',
        dataIndex: 'goodsNum',
        key: 'goodsNum',
        render: text => <div style={{color: '#1890ff'}}>{text}</div>
      }
    ];

    return(
      <>
         <Table columns={columns} dataSource={data[record.orderNum]} pagination={false} />
      </>
    )
  }
  

  const columns = [
    {
      title: '订单编号',
      dataIndex: 'orderNum',
      key: 'orderNum',
      align: 'center',
    },
    {
      title: '支付方式',
      dataIndex: 'payWay',
      key: 'payWay',
      align: 'center',
      render: text =>{
        if(text===1){
          return <Tag color="green">微信支付</Tag>
        }else if(text===2){
          return <Tag color="geekblue">支付宝支付</Tag>
        }else if(text===3){
          return <Tag color="red">现金支付</Tag>
        }else{
          return <div>—-</div>
        }
      }
    },
    {
      title: '商品种类',
      dataIndex: 'totalNum',
      key: 'totalNum',
      align: 'center',
    },
     {
      title: '商品总价',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      align: 'center',
      render: text => <div style={{color: 'red'}}>¥{text}</div>
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      align: 'center',
      render: text => {
        const time = new Date(text)
        function changeTime(fn, times){
          const length = String(times[fn]()).length
          if(length===1){
            return `0${times[fn]()}`
          }else{
            return times[fn]()
          }
        }
        return <div>{`${time.getFullYear()}-${time.getMonth()+1}-${time.getDate()} ${changeTime('getHours',time)}:${changeTime('getMinutes',time)}:${changeTime('getSeconds',time)}`}</div>
      },
    },
    {
      title: '付款时间',
      dataIndex: 'payMentTime',
      key: 'payMentTime',
      align: 'center',
      render: text => {
        const time = new Date(text)
        function changeTime(fn, times){
          const length = String(times[fn]()).length
          if(length===1){
            return `0${times[fn]()}`
          }else{
            return times[fn]()
          }
        }
        return <div>{`${time.getFullYear()}-${time.getMonth()+1}-${time.getDate()} ${changeTime('getHours',time)}:${changeTime('getMinutes',time)}:${changeTime('getSeconds',time)}`}</div>
      },
    },
    {
      className:'colums',
      title: '操作',
      align: 'center',
      key: 'action',
      render: (text, record) => {
        if(text.orderStatus===1){
          return (
            <div>
              <Button size='small' style={{margin: '0 5px'}}>查看</Button>
            </div>
          )
        }else{
          return (
            <div>
              <Button size='small' style={{margin: '0 5px'}} onClick={e => pay(text)}>付款</Button>
              <Modal
                title="付款"
                visible={visible}
                footer={null}
              >
                <Form
                  form={form}
                  fields={fields}
                  >
                    <Form.Item
                      name='orderNum'
                      label='订单编号'
                    >
                      <Input allowClear={true}/>
                    </Form.Item>
                    <Form.Item
                      name='totalPrice'
                      label='商品总价'
                    >
                      <Input allowClear={true}/>
                    </Form.Item>
                    <Form.Item
                      name='totalNum'
                      label='商品总数'
                    >
                      <Input allowClear={true}/>
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
                      <Select allowClear={true} onChange={(value) => setPayWay(value)}>
                        <Select.Option  value={1}>微信支付</Select.Option>
                        <Select.Option  value={2}>支付宝支付</Select.Option>
                        <Select.Option  value={3}>现金支付</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item style={{textAlign: "center"}}>
                    <Button type="primary" htmlType="submit" style={{margin:'0 20px'}} onClick={e => confirm()}>
                        确定
                    </Button>
                    <Button  onClick={handleCancel}>取消</Button>
                </Form.Item>
                  </Form>
              </Modal>
            </div>
          )
        }
      }
    },
  ];

  return (
    <div>
      <Table 
        className="components-table-demo-nested"
        dataSource={ordersListKey} 
        columns={columns}
        expandable={{ expandedRowRender }}
        expandRowByClick={true}
        onExpand={change}
        />
    </div>
  )
})
