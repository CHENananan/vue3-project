import axios from 'axios'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import { useUserStore } from '@/stores/user'
import router from '@/router'

const httpInstance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net/',
  timeout: 5000,
})

// 请求拦截器
httpInstance.interceptors.request.use(
  (config) => {
    const { getToken } = useUserStore()
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)
// 响应拦截器

httpInstance.interceptors.response.use(
  (res) => {
    return res.data
  },
  (err) => {
    const { response } = err

    if (response.status === 401) {
      const { logout } = useUserStore()
      ElMessage.error('登录状态失效，请重新登录')
      logout()
      router.replace('/login')
    } else {
      ElMessage.error(response.data.message)
    }

    return Promise.reject(err)
  }
)

export default httpInstance
