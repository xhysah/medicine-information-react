import React, { memo, useEffect, useState } from 'react'
import { Table, Button, Popconfirm, message } from 'antd';
import { search, deleteUsersByuserName } from '@/services/users'

export default memo(function () {
  const [data, setData] = useState([])
  useEffect(() => {
    search().then(res =>{
      let dataSource = res.map((item, index) =>{
        return { ...item, key: index }
      })
      setData(dataSource)
    })
  },[])
  // 删除账号
  function deleteUser(text){
    deleteUsersByuserName(text.username).then(res=>{
      message.success('删除成功') 
    })
  }
  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      align: 'center',
    },
    {
      title: '用户角色',
      dataIndex: 'role',
      key: 'role',
      align: 'center',
      render: (text, record) => text+''==='1'?'管理员': '普通用户'
    },
    {
      title: '用户注册时间',
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
      title: '操作',
      key: 'action',
      align: 'center',
      render: (text, record) => {
          return (
          <div>
            <Popconfirm
              title="确认要删除吗"
              okText="确认"
              placement="top"
              cancelText="取消"
              onConfirm={e=>deleteUser(text)}
            >
              <Button size='small'  type='primary'  style={{margin: '0 5px'}} >删除账号</Button>
            </Popconfirm>
          </div>
        )
      }
    },
  ];  
  return (
    <div>
      <Table dataSource={data} columns={columns} />;
    </div>
  )
})
