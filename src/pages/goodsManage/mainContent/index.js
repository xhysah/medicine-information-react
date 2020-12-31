import React, { memo, useState, useRef,useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector }  from 'react-redux'
import { getGoodsList } from '@/services/goods'

import { changeAddShoppingListAction } from '../store/actionCreators'
import { MainContentWrapper } from './style'
import GoodsItem from '@/components/goodsItem'
import { LeftOutlined, RightOutlined } from '@ant-design/icons';


import { Carousel } from 'antd';

export default memo(function (props) {
  const refCarousel = useRef()
  const { cid } = props
  const [goodsList, setGoodsList] = useState([])
  useEffect(() => {
    getGoodsList(cid).then(res => {
      const list =[]
      const length = Math.ceil(res.length/10)
      for(let i=0;i<length;i++){
        if(i===length-1){
          list.push(res.slice(10*i))
        }else{
          list.push(res.slice(10*i, 10*i+10))
        }
      }
      setGoodsList(list)
    })
  }, [cid])

  const { shoppingCartList } = useSelector(state => ({
    shoppingCartList: state.get('goodsManage').get('shoppingCartList')
  }),shallowEqual)

  
  const dispatch = useDispatch()
  
  function addShoppingCart(goods, indexs, index){
    var list =[...shoppingCartList]
    var flag = false;
     for(let i=0; i<shoppingCartList.length; i++){
      if(shoppingCartList[i].goodsId === goods.goodsId){
        list[i].goodsNum = list[i].goodsNum+1
        dispatch(changeAddShoppingListAction(list))
        flag = true;
        break;
      }
     }
     if(!flag){
      const goodsValue = {...goods,goodsNum:1, index:index, indexs: indexs, setGoodsList:setGoodsList, goodsList:goodsList}
      list.push(goodsValue)
     }
    dispatch(changeAddShoppingListAction(list))
  }

  function changeGoodsListBystocks(index, indexs, num){
    const result = [...goodsList]
    result[index][indexs].stocks = result[index][indexs].stocks - num
    setGoodsList(result)
  }
  
  function goLeft(){
    refCarousel.current.prev()
  }
  function goRight(){
    refCarousel.current.next()
  }
  return (
    <MainContentWrapper>
      <Carousel className='center' dots={false} ref={refCarousel}>
        {
          goodsList.map((item, index) => {
            return (
              <div key={index} className='grid'>
                {
                  item.map((items,indexs) => {
                    return <GoodsItem key={items.goodsId} good={items} indexs={indexs} index={index} addShoppingCart={addShoppingCart} changeGoodsListBystocks={changeGoodsListBystocks}/>
                  })
                }
              </div>
            )
          })
        }
      </Carousel>
      <LeftOutlined className='left' style={{ fontSize: '30px', color: '#1890ff' }} onClick={e => goLeft()}/>
      <RightOutlined className='right' style={{ fontSize: '30px' ,color: '#1890ff' }} onClick={e => goRight()}/>
    </MainContentWrapper>
  )
})
