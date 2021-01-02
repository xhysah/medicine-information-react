import React, { memo, useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { getOrderListAction } from '../store/actionCreators'
import { searchOrdersDetails } from '@/services/orderDetails'
import { returnGoods } from '@/services/orders'

import { Table, Button, Tag, Popconfirm } from 'antd'

export default memo(function () {
  const [data, setData] = useState({})
  const [orderNum, setOrderNum] = useState()
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
  
  function change( expanded, record){
    if(expanded && typeof record.orderNum !== undefined){
      setOrderNum(record.orderNum)
    }
  }
  const ordersListKey = ordersList.map((item, index) => {
    return { ...item, key: index }
  })
  

  function returnGood(text){
    returnGoods(text.orderNum).then(res=>{
      console.log(res);
    })
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
      title: '商品总价',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      align: 'center',
      render: text => <div style={{color: 'red'}}>¥{text}</div>
    },
    {
      title: '商品种类',
      dataIndex: 'totalNum',
      key: 'totalNum',
      align: 'center',
    },
    {
      title: '订单状态',
      dataIndex: 'orderStatus',
      key: 'orderStatus',
      align: 'center',
      render: text =>{
        if(text===1){
          return <div style={{color: '#1890ff'}}>已支付</div>
        }else if(text===2){
          return <div>已退款</div>
        }
      }
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
      title: '订单生成时间',
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
      className:'colums',
      title: '操作',
      align: 'center',
      key: 'action',
      render: (text, record) => {
          return (
          <div>
            <Popconfirm
              title="确认要退货退款吗"
              okText="确认"
              placement="top"
              cancelText="取消"
              onConfirm={e=>returnGood(text)}
              disabled={!(text.orderStatus===1)}
            >
              <Button size='small' style={{margin: '0 5px'}} disabled={!(text.orderStatus===1)}>退货</Button>
            </Popconfirm>
          </div>
        )
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
        onExpand={change}
        />
    </div>
  )
})
