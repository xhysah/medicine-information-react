import React, { memo } from 'react'
import PayWayCirle from './payWay'
import Goods from './goods'
// import Price from './price'


export default memo(function () {
  return (
    <div>
      <PayWayCirle/>
      <Goods/>
      {/* <Price/> */}
    </div>
  )
})
