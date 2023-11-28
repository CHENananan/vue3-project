import { ref, onMounted } from 'vue'
import { getCategoryList } from '@/apis/category'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'

export const useCategory = () => {
  const categoryData = ref([])
  const route = useRoute()

  const queryCategoryList = async (id) => {
    const res = await getCategoryList({
      id,
    })
    categoryData.value = res.result
  }

  onMounted(() => {
    queryCategoryList(route.params.id)
  })

  // 路由变化时，重新请求数据
  onBeforeRouteUpdate((to) => {
    queryCategoryList(to.params.id)
  })

  // watch(
  //   ()=>route.params,
  //   () => {
  //     queryCategoryList(route.params.id);
  // });

  return {
    categoryData,
    queryCategoryList,
  }
}
