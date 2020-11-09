
import { Map } from 'immutable'

import * as actionType from './constant'


const defaultState = Map({
  categories: [],
  goodsList: [],
  shoppingCartList: []
})

function reducer(state = defaultState, action) {
  switch(action.type){
    case actionType.CHANGE_CATEGORIES:
      return state.set('categories', action.categories)
    case actionType.CHANGE_GOODS_LIST:
      return state.set('goodsList', action.goodsList)
    case actionType.CHANGE_ADD_TO_SHOPPING_CART:
      return state.set('shoppingCartList', action.shoppingCartList)
    default:
      return state
  }
}

export default reducer