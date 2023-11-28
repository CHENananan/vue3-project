import request from '@/utils/http'

export const doLogin = (params) => {
  return request.post('/login', {
    ...params,
  })
}
