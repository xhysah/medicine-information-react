import React, { memo } from 'react'
import ShoppingCart from './shoppingCart'
import Main from './mian'

export default memo(function () {
  return (
    <div>
      <Main/>
      <ShoppingCart/>
    </div>
  )
})
