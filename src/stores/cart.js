import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useUserStore } from './user'
import { insertCart, getCartList, removeCart } from '@/apis/cart'

export const useCartStore = defineStore(
  'cart',
  () => {
    const userStore = useUserStore()

    const isLogin = computed(() => {
      return !!userStore.getToken()
    })

    const cartList = ref([])

    const cartTotalCount = computed(() => {
      return cartList.value.reduce((total, item) => {
        return total + item.count
      }, 0)
    })

    const cartTotalPrice = computed(() => {
      return cartList.value.reduce((total, item) => {
        return total + item.count * item.price
      }, 0)
    })

    const cartSelectedTotalState = computed(() => {
      if (cartList.value.length === 0) return false
      return cartList.value.every((item) => item.selected)
    })

    const cartSelectedTotalCount = computed(() => {
      return cartList.value
        .filter((item) => item.selected)
        .reduce((total, item) => {
          return total + item.count
        }, 0)
    })

    const cartSelectedTotalPrice = computed(() => {
      return cartList.value
        .filter((item) => item.selected)
        .reduce((total, item) => {
          return total + item.count * item.price
        }, 0)
    })

    const queryCartList = async () => {
      const res = await getCartList()
      cartList.value = res.result
    }

    const insert = async (goods) => {
      if (isLogin.value) {
        // 已登录
        await insertCart({
          skuId: goods.skuId,
          count: 1,
        })
        queryCartList()
      } else {
        // 未登录
        // 添加购物车操作
        // 已添加过 - count + 1
        // 没有添加过 - 直接push
        // 思路：通过匹配传递过来的商品对象中的skuId能不能在cartList中找到，找到了就是添加过
        const item = cartList.value.find((item) => goods.skuId === item.skuId)
        if (item) {
          // 找到了
          item.count++
        } else {
          // 没找到
          cartList.value.push(goods)
        }
      }
    }

    const remove = async (goods) => {
      if (isLogin.value) {
        // 已登录
        await removeCart({
          ids: [goods.skuId],
        })
        queryCartList()
      } else {
        // 删除购物车操作
        // 已添加过 - count - 1
        // 没有添加过 - 直接push
        // 思路：通过匹配传递过来的商品对象中的skuId能不能在cartList中找到，找到了就是添加过
        const index = cartList.value.findIndex(
          (item) => goods.skuId === item.skuId
        )
        cartList.value.splice(index, 1)
      }
    }

    const check = (selected, goods) => {
      // 选中购物车操作
      // 已添加过 - checked = true
      // 没有添加过 - 直接push
      // 思路：通过匹配传递过来的商品对象中的skuId能不能在cartList中找到，找到了就是添加过
      const item = cartList.value.find((item) => goods.skuId === item.skuId)
      if (item) {
        // 找到了
        item.selected = selected
      }
    }

    const checkAll = (selected) => {
      // 选中购物车操作
      // 已添加过 - checked = true
      // 没有添加过 - 直接push
      // 思路：通过匹配传递过来的商品对象中的skuId能不能在cartList中找到，找到了就是添加过
      cartList.value.forEach((item) => {
        item.selected = selected
      })
    }

    const clear = () => {
      cartList.value = []
    }

    return {
      cartList,
      cartTotalCount,
      cartTotalPrice,
      cartSelectedTotalState,
      cartSelectedTotalCount,
      cartSelectedTotalPrice,
      queryCartList,
      insert,
      remove,
      check,
      checkAll,
      clear,
    }
  },
  {
    persist: true,
  }
)
