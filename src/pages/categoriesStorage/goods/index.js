import React, { memo, useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import { getChangeCategoriesAction } from '@/pages/goodsManage/store/actionCreators'

import { Collapse } from 'antd';
import GoodsTable from'./goodsTable'

const { Panel } = Collapse;
export default memo(function () {
  const { categories } = useSelector(state => ({
    categories: state.get('goodsManage').get('categories')
  }),shallowEqual)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getChangeCategoriesAction()) 
  },[dispatch])
  
  return (
    <div>
      <Collapse defaultActiveKey={[1]} >
        {
          categories.map(item => {
            return (<Panel header={item.cname} key={item.cid}><GoodsTable cid={item.cid} /></Panel>)
          })
        }
      </Collapse>
    </div>
  )
})
