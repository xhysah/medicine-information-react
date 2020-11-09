import request from './axios'

// 根据分类id查询商品
export const getGoodsList = (cid)=> {
    return request({
        url: '/goods/search',
        params: {
            cid
        }
    })
}

export const addGoods = (info)=> {
    return request({
        url: '/goods/add',
        method: 'post',
        data: info
    })
}

export const deleteGoods = (goodsId, goodsUrl)=> {
    return request({
        url: '/goods/delete',
        method: 'post',
        data: {
            goodsId: goodsId,
            goodsUrl: goodsUrl
        }
    })
}

export const alterGoods = (info)=> {
    return request({
        url: '/goods/update',
        method: 'post',
        data: info
    })
}
