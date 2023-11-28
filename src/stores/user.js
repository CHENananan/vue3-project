import { ref } from 'vue'
import { defineStore } from 'pinia'
import { doLogin } from '@/apis/login'
import { useCartStore } from './cart'
import { mergeCart } from '@/apis/cart'

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref({})

    const cartStore = useCartStore()

    const queryUserInfo = async (params) => {
      const data = await doLogin(params)
      userInfo.value = data.result

      await mergeCart(
        cartStore.cartList.map((item) => {
          return {
            skuId: item.skuId,
            count: item.count,
            selected: item.selected,
          }
        })
      )
      cartStore.queryCartList()
    }

    const getToken = () => {
      return userInfo.value?.token
    }

    const logout = () => {
      userInfo.value = {}
      cartStore.clear()
    }

    return { userInfo, queryUserInfo, getToken, logout }
  },
  {
    persist: true,
  }
)
