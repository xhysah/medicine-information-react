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
export const registers = (registerInf,role) =>{
  return request({
    url: '/users/register',
    method: 'post',
    data: {
      username: registerInf.username,
      password: registerInf.password1,
      role: role
    }
  })
}