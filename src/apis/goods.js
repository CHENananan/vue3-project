import request from '@/utils/http'

export const getGoodsInfo = (params) => {
  return request.get('/goods', {
    params,
  })
}

export const getRecommendGoods = (params) => {
  return request.get('/goods/hot', {
    params,
  })
}
