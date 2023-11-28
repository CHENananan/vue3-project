import request from '@/utils/http'

export const getCategoryList = (params) => {
  return request.get('/category', {
    params,
  })
}

export const getSubCategoryInfo = (params) => {
  return request.get('/category/sub/filter', {
    params,
  })
}

export const getSubCategoryList = (params) => {
  return request.post('/category/goods/temporary', {
    ...params,
  })
}
