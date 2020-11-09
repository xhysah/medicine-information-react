import React, { memo, useEffect, useState } from 'react'
import ReactEcharts from 'echarts-for-react';
import { searchpayMentTime } from '@/services/orders'

export default memo(function () {
  const [data, setData] = useState([[],[],[],[]])
  useEffect(()=>{
    searchpayMentTime().then(res =>{
      setData(res)
    })
  },[])
  const option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        data: ['总销售额', '微信支付', '支付宝支付', '现金支付']
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            data: [...data[0].map(item=>item.time)]
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: '总销售额',
            type: 'bar',
            stack: '总量',
            data: [...data[0].map(item=>item.totalPrice)]
        },
        {
            name: '微信支付',
            type: 'bar',
            stack: '总量',
            data: [...data[1].map(item=>item.totalPrice)]
        },
        {
            name: '支付宝支付',
            type: 'bar',
            stack: '总量',
            data: [...data[2].map(item=>item.totalPrice)]
        },
        {
            name: '现金支付',
            type: 'bar',
            stack: '总量',
            data: [...data[3].map(item=>item.totalPrice)]
        }
    ]
  };
  return (
    <div>
      <ReactEcharts option={option}/>
    </div>
  )
})
