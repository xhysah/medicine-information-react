import * as actionType from './constant'
import { searchOrders } from '@/services/orders'

export const changeOrdersListAction = (res) => ({
  type: actionType.SEARCH_ORDERS,
  ordersList: res
})

export function getOrderListAction() {
  return dispatch => {
    searchOrders().then(res => {
      dispatch(changeOrdersListAction(res))
    })
  }
} 