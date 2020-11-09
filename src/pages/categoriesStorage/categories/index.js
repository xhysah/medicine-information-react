import React, { memo, useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import { getChangeCategoriesAction } from '@/pages/goodsManage/store/actionCreators'
import { editCategories } from '@/services/categories'
import Category from '@/components/category'


export default memo(function () {
  const { categories } = useSelector(state => ({
    categories: state.get('goodsManage').get('categories')
  }),shallowEqual)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getChangeCategoriesAction()) 
  },[dispatch])
  
  return (
    <>
      {
        categories.map(item => {
            return <Category key={item.cid} category={item} editCategories={editCategories}/>
          })
      }
    </>
  )
})
