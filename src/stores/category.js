import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCategory } from '@/apis/home'

export const useCategoryStore = defineStore('category', () => {
  const categoryList = ref([])

  const queryCategory = async () => {
    const data = await getCategory()
    categoryList.value = data.result
  }

  return { categoryList, queryCategory }
})
