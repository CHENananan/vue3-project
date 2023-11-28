import request from '@/utils/http'

export const getCheckoutInfo = () => {
  return request.get('/member/order/pre')
}

export const createOrder = (params) => {
  return request.post('/member/order', {
    ...params,
  })
}
