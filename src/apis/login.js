import request from '@/utils/http'

export const doLogin = ({ account, password }) => {
  return request.post('/login', {
    account,
    password,
  })
}
