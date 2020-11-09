import { Map } from 'immutable'
import { CHANGE_USER } from './constant'

const defaultState = Map({
  user: {}
})

function reducer(state = defaultState, action) {
  switch(action.type){
    case CHANGE_USER:
      return state.set('user', action.user)
    default:
      return state  
  }
}


export default reducer