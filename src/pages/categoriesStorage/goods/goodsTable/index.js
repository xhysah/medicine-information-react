import React, { memo, useEffect, useState } from 'react'


import { getGoodsList, deleteGoods, alterGoods } from '@/services/goods'

import AlterGoods from './alterGoods'
import { Table, Button, Popconfirm, Tag } from 'antd'
import { TableWrapper } from './../../style'

export default memo(function (props) {
  const { cid } = props
  const [goodsList, setGoodsList] = useState([])
  useEffect(() => {
    getGoodsList(cid).then(res => {
      setGoodsList(res)
    })
  }, [cid])
  const goodsListKey = goodsList.map((item, index) => {
    return { ...item, key: index }
  })

  function confirm(goodsId,goodsUrl) {
    deleteGoods(goodsId,goodsUrl)
  }
  
  const columns = [
    {
      className:'colums',
      title: '商品名称',
      dataIndex: 'goodsName',
      align: 'center',
      key: 'goodsName',
      render: text => <div>{text}</div>,
    },
    {
      className:'colums',
      ellipsis: true,
      align: 'center',
      title: '商品图片',
      dataIndex: 'goodsUrl',
      key: 'goodsUrl',
      render: text => <img src={text} alt={text} style={{width:'50px', height: '50px'}}/>,
    },
    {
      className:'colums',
      title: '商品价格',
      align: 'center',
      dataIndex: 'price',
      key: 'price',
      render: text => <div style={{color: 'red'}}>¥{text}</div>,
    },
    {
      className:'colums',
      title: '商品库存',
      align: 'center',
      dataIndex: 'stocks',
      key: 'stocks',
      render: text => {
        if(text<=0){
          return <Tag color="magenta">售空</Tag>
        }else{
          return <div style={{ color:text<=0?'red': 'black'}}>{text}</div>
        }
      },
    },
    {
      className:'colums',
      title: '商品描述',
      align: 'center',
      dataIndex: 'description',
      key: 'description',
    },
    {
      className:'colums',
      title: '添加时间',
      align: 'center',
      dataIndex: 'addTime',
      key: 'addTime',
      render: text => <div>{`${new Date(text).getFullYear()}-${new Date(text).getMonth()+1}-${new Date(text).getDate()}`}</div>,
    },
    {
      className:'colums',
      title: '更新时间',
      align: 'center',
      dataIndex: 'updateTime',
      key: 'updateTime',
      render: text => <div>{`${new Date(text).getFullYear()}-${new Date(text).getMonth()+1}-${new Date(text).getDate()}`}</div>,
    },
    {
      className:'colums',
      title: '操作',
      align: 'center',
      key: 'action',
      render: (text, record) => (
        <div>
          <AlterGoods text={text} alterGoods={alterGoods}/>
          <Popconfirm
            title="确认要删除这个商品吗"
            okText="确认"
            cancelText="取消"
            onConfirm={e=>confirm(text.goodsId, text.goodsUrl)}
          >
            <Button size='small' style={{margin: '0 5px'}}>删除</Button>
          </Popconfirm>
        </div>
      )
    },
  ]

  return (
    <TableWrapper>
      <Table dataSource={goodsListKey} columns={columns}/>
    </TableWrapper>
  )
})
