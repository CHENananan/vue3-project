import request from '@/utils/http'

export const getCategory = () => {
  return request.get('/home/category/head')
}

export const getBannerList = (params = {}) => {
  // 默认为1 商品为2
  const { distributionSite = '1' } = params
  return request.get('/home/banner', {
    params: {
      distributionSite,
    },
  })
}

export const getFreshThings = () => {
  return request.get('/home/new')
}

export const getRecommendThings = () => {
  return request.get('/home/hot')
}

export const getGoodsList = () => {
  return request.get('/home/goods')
}
