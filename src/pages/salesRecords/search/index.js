import React, { memo, useState } from 'react'
import { useDispatch } from 'react-redux'

import { searchOrdersByTime } from '@/services/orders'
import { changeOrdersListAction } from '../store/actionCreators'

import { Select, Button, DatePicker } from 'antd'
const { RangePicker } = DatePicker;

export default memo(function () {
  const [payWay, setPayWay] = useState(0)
  const [time, setTime] = useState(['', ''])
  const dispatch = useDispatch()
  
  function search() {
    searchOrdersByTime({
      payWay,
      time
    }).then(res=>{
      dispatch(changeOrdersListAction(res))
    })
  }

  function onChange(date, dateString) {
    setTime(dateString)
  }
  
  function handleChange(value){
    if(value){
      setPayWay(value.value)
    }else{
      setPayWay(0)
    }
    
  }

  function reset() {}
  return (
    <div>
      <div>
        <div style={{width: 'auto',margin: '10px', display: 'inline-block'}}>
          <span>时间段：</span>
          <RangePicker
          onChange={onChange}
          allowClear={true}
          />
          </div>
        <div style={{width: 'auto',margin: '10px', display: 'inline-block'}}>
          <span>支付方式：</span>
          <Select allowClear={true} style={{width: '200px'}} onChange={(e,value) =>handleChange(value)}>
            <Select.Option  value={1}>微信支付</Select.Option>
            <Select.Option  value={2}>支付宝支付</Select.Option>
            <Select.Option  value={3}>现金支付</Select.Option>
          </Select>
        </div>
      </div>
      <div style={{float: "right",margin: '10px 20px'}}>
        <Button type="primary" style={{margin:'0 10px'}} onClick={e => search()}>查询</Button>
        <Button onClick={e => reset()}>重置</Button>
      </div>
    </div>
  )
})
