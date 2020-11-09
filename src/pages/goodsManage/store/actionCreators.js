import * as actionType from './constant'
import { getCategories }  from '@/services/categories'
import { getGoodsList } from '@/services/goods'

const changeCategoriesAction = res => ({
  type: actionType.CHANGE_CATEGORIES,
  categories: res
})

const changeGoodsListAction = res => ({
  type: actionType.CHANGE_GOODS_LIST,
  goodsList: res
})

export function getChangeCategoriesAction() {
  return dispatch => {
    getCategories().then(res => {
      dispatch(changeCategoriesAction(res))
    })
  }
}

export function getChangeGoodsListAction(cid) {
  return dispatch => {
    getGoodsList(cid).then(res => {
      dispatch(changeGoodsListAction(res))
    })
  }
}

export function changeAddShoppingListAction (list) {
  return{
    type: actionType.CHANGE_ADD_TO_SHOPPING_CART,
    shoppingCartList: list
  }
}


export function changeGoodsList(list) {
  return{
    type: actionType.CHANGE_GOODS_LIST,
    goodsList: list
  }
}
