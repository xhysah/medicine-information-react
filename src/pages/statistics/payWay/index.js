import React, { memo, useEffect, useState } from 'react'
import ReactEcharts from 'echarts-for-react';
import { searchpayWay } from '@/services/orders'
import { DatePicker, Button } from 'antd'
const { RangePicker } = DatePicker;

export default memo(function () {
  const [time, setTime] = useState(['', ''])
  const [payWay, setPayWay] =useState({'1':{},'2':{},'3':{}})
  useEffect(()=>{
    searchpayWay(['', '']).then(res=>{
      setPayWay(res)
    })
  },[])
  function search() {
    searchpayWay(time).then(res=>{
      setPayWay(res)
    })
  }
  function onChange(date, dateString) {
    setTime(dateString)
  }
  console.log(payWay)
  const total = Math.abs(payWay['1'].totalPrice+ payWay['2'].totalPrice+ payWay['3'].totalPrice).toString();
  const option = {
    title: {
        text: '支付方式',
        left: 'center'
    },
    tooltip:{
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend:{
        orient: 'vertical',
        left: 'left',
        data: [ '微信支付', '支付宝支付', '现金支付']
    },
    series: [
        {
            name: '支付方式',
            type: 'pie',
            radius: '55%',
            center: ['20%', '60%'],
            data: [
                {value: payWay['1'].num, name: '微信支付'},
                {value: payWay['2'].num, name: '支付宝支付'},
                {value: payWay['3'].num, name: '现金支付'}
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        },
        {
          name: '付款金额',
          type: 'pie',
          radius: '55%',
          center: ['80%', '60%'],
          data: [
              {value: payWay['1'].totalPrice, name: '微信支付'},
              {value: payWay['2'].totalPrice, name: '支付宝支付'},
              {value: payWay['3'].totalPrice, name: '现金支付'}
          ],
          emphasis: {
              itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
          }
      }
    ]
};
  return (
    <div>
      <span>时间段：</span>
        <RangePicker
          onChange={onChange}
          allowClear={true}
        />
        <Button type="primary" style={{margin:'0 10px'}} onClick={e => search()}>查询</Button>
        <div>{total}</div>
       <ReactEcharts option={option} />
    </div>
  )
})
