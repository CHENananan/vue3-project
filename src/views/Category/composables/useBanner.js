import { ref, onMounted } from 'vue'
import { getBanner } from '@/apis/home'

export const useBanner = () => {
  const bannerList = ref([])

  const queryBanner = async () => {
    const res = await getBanner({
      distributionSite: '2',
    })
    bannerList.value = res.result
  }

  onMounted(() => {
    queryBanner()
  })

  return {
    bannerList,
    queryBanner,
  }
}
