import React, { memo, useEffect } from 'react'
import ReactEcharts from 'echarts-for-react';
import { shallowEqual, useDispatch, useSelector }  from 'react-redux'
import { getChangeCategoriesAction } from '@/pages/goodsManage/store/actionCreators'
import { getChangeGoodsListAction } from '@/pages/goodsManage/store/actionCreators'
import { GoodsWrapper } from './../payWay/style'
import { Tag } from 'antd';
import { useState } from 'react';

export default memo(function () {
  
  const { categories } = useSelector(state => ({
    categories: state.get('goodsManage').get('categories')
  }),shallowEqual)
  const [cid, setCid] = useState(1)
  const { goodsList } = useSelector(state => ({
    goodsList: state.get('goodsManage').get('goodsList')
  }),shallowEqual)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getChangeCategoriesAction()) 
  },[dispatch])

  useEffect(() => {
    dispatch(getChangeGoodsListAction(cid))
  },[cid, dispatch])

  const colors = ['magenta','red','volcano','orange','gold','lime','green','cyan','blue','geekblue','purple']
  const option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        data: ['销售量', '库存量']
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
            data: [...goodsList.map(item=> item.goodsName)]
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: '销售量',
            type: 'bar',
            stack: '广告',
            data: [...goodsList.map(item=> item.salesNum)]
        },
        {
            name: '库存量',
            type: 'bar',
            stack: '广告',
            data: [...goodsList.map(item=> item.stocks)]
        }
    ]
};
  return (
    <GoodsWrapper>
      <div className='tags'>
        {categories.map((item,index) =>{
          return <Tag color={colors[(index%11)]} className='tag' key={item.cid} onClick={e=> setCid(item.cid)}>{item.cname}</Tag>
        })}
      </div>
      <ReactEcharts option={option} className='echart'/>
    </GoodsWrapper>
  )
})
