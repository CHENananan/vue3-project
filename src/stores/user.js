import { ref } from 'vue'
import { defineStore } from 'pinia'
import { doLogin } from '@/apis/login'

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref({})

    const queryUserInfo = async (params) => {
      const data = await doLogin(params)
      userInfo.value = data.result
    }

    const getToken = () => {
      return userInfo.value?.token
    }

    const logout = () => {
      userInfo.value = {}
    }

    return { userInfo, queryUserInfo, getToken, logout }
  },
  {
    persist: true,
  }
)
