import request from './axios'

export const getCategories = ()=> {
  return request({
      url: '/categories/search'
  })
}

export const addCategories = (info)=> {
    return request({
        url: '/categories/add',
        method: 'post',
        data: {
          cname: info.cname,
          description: info.description,
          imgUrl: info.imgUrl
        }
    })
}

export const editCategories = (info)=> {
  return request({
      url: '/categories/edit',
      method: 'post',
      data: {
        cname: info.cname,
        description: info.description,
        imgUrl: info.imgUrl,
        cid: info.cid
      }
  })
}
