import request from './axios'

export const addOrders = (info) =>{
  console.log(info)
  return request({
    url: '/orders/add',
    method: 'post',
    data: info
  })
}

export const searchOrders = () => {
  return request({
    url: '/orders/search'
  })
}

export const updateOrders = (info) => {
  return request({
    url: '/orders/update',
    method: 'post',
    data: info
  })
}


export const searchpayWay = (info) => {
  return request({
    url: '/orders/payWay',
    params: {
      start: info[0],
      end: info[1]
    }
  });
}

export const searchpayMentTime = () => {
  return request({
    url: '/orders/payMentTime'
  })
}

// 删除订单
export const deleteOrders = (orderNum) => {
  return request({
    url: '/orders/deleteOrders',
    params: {
      orderNum
    }
  })
}

export const searchOrdersByTime = (info) => {
  return request({
    url: '/orders/searchOrdersByTime',
    params: {
      payWay:info.payWay,
      start: info.time[0],
      end: info.time[1]
    }
  })
}

// 退货
export const returnGoods = (orderNum) => {
  return request({
    url: '/orders/returnGoods',
    method: 'post',
    data: {
      orderNum
    }
  })
}