import React, { memo, useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { getChangeCategoriesAction } from '../store/actionCreators'

import MainContent from '../mainContent'
import { MainWrapper } from './style'

import { Tabs } from 'antd'
const { TabPane } = Tabs;
export default memo(function (props) {
  const { categories } = useSelector(state => ({
    categories: state.getIn(['goodsManage','categories'])
  }), shallowEqual)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getChangeCategoriesAction())
  },[dispatch])
  return (
    <MainWrapper>
      <Tabs defaultActiveKey='1'>
        {
          categories.map(item => {
            return (<TabPane tab={item.cname} key={item.cid}>
              <MainContent cid={item.cid}/>
                </TabPane>)
          })
        }
      </Tabs>
    </MainWrapper>
  )
})
