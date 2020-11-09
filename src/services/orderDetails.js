import request from './axios'

export const addOrderDetails = (info,orderNum) =>{
  return request({
    url: '/orderDetails/add',
    method: 'post',
    data: {
      shoppingCartList: info,
      orderNum
    }
  })
}


export const searchOrdersDetails = (orderNum) =>{
  return request({
    url: '/orderDetails/search',
    params: {
      orderNum
    }
  })
}