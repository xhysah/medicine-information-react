import { Map } from 'immutable'
import * as actionType from './constant'

const defaultSstate = Map({
  ordersList: []
})

function reducer(state = defaultSstate, action){
  switch(action.type){
    case actionType.SEARCH_ORDERS:
      return state.set('ordersList', action.ordersList)
    default:
      return state
  }
}

export default reducer