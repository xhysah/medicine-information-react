import request from './axios'

export const login = (loginInf) =>{
  return request({
    url: '/users',
    method: 'post',
    data: {
      username: loginInf.username,
      password: loginInf.password
    }
  })
}