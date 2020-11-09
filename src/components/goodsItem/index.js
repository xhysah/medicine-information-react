import React, { memo } from 'react'

import { Card, message } from 'antd';
import { GoodsItemWrapper } from './style'


export default memo(function (props) {
  const { good, addShoppingCart, changeGoodsListBystocks, index, indexs } = props
  const ifNull= good.stocks<=0

  function addToShoppingCart(){
    if(ifNull){
      message.warning('没有该货品了');
    }else{
      changeGoodsListBystocks(index,indexs, 1)
      message.success('添加至购物车');
      addShoppingCart(good, indexs, index)
    }
  }

  return (
    <GoodsItemWrapper ifNull={ifNull?0.5:1}>
      <Card className='card' onClick={e => addToShoppingCart(good)} >
        <img src={good.goodsUrl} alt={good.goodsName}/>
        <div className='width goodsName'>{good.goodsName}</div>
        <div className='bottom'>
          <span className='price'>¥ {good.price}</span>
          <span className='stocks'>库存量:{good.stocks}</span>
        </div>
        <div className='no' style={{display: ifNull?'block': 'none'}}>售空</div>
      </Card>
    </GoodsItemWrapper>
  )
})
