import request from '@/utils/http'

export const getOrderInfo = (id) => {
  return request.get(`/member/order/${id}`)
}
