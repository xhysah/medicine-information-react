import React, { memo } from 'react'

import { addCategories } from '@/services/categories'
import { addGoods } from '@/services/goods'

import CategoryAdd from './add/categoryAdd'
import { CategoriesWrapper } from './style'
import Categories from './categories'
import Goods from './goods'
import GoodsAdd from './add/goodsAdd'

export default memo(function () {
  
  
  return (
    <CategoriesWrapper>
      <div className='add'>
        <CategoryAdd addCategories={addCategories}/>
        <GoodsAdd addGoods={addGoods}/>
      </div>
      <div className='categories'>
        <Categories/>
      </div>
      <div className='goods'>
          <Goods/>
      </div>
    </CategoriesWrapper>
  )
})
