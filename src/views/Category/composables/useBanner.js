import { ref, onMounted } from 'vue'
import { getBannerList } from '@/apis/home'

export const useBanner = () => {
  const bannerList = ref([])

  const queryBanner = async () => {
    const res = await getBannerList({
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
