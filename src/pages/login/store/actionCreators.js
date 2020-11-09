import { CHANGE_USER } from './constant'
import { login } from '@/services/users'
const changeUserAction = res => ({
  type: CHANGE_USER,
  user: res.user
})

export const userAction = () => {
  return dispatch => {
    login().then(res => {
      dispatch(changeUserAction(res))
    })
  }
}