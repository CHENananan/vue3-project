import request from '@/utils/http'

export const getCartList = () => {
  return request.get('/member/cart')
}

export const insertCart = (params) => {
  return request.post('/member/cart', {
    ...params,
  })
}

export const removeCart = (params) => {
  return request.delete('/member/cart', {
    data: params,
  })
}

export const mergeCart = (params) => {
  return request.post('/member/cart/merge', params)
}
