<script setup>
import { onMounted } from 'vue'

import { useCategoryStore } from '@/stores/category'

import NavigationBar from './NavigationBar.vue'
import StickyHeader from './Header/StickyHeader.vue'
import CommonHeader from './Header/Header.vue'
import CommonFooter from './Footer.vue'

const categoryStore = useCategoryStore()

onMounted(() => {
  categoryStore.queryCategory()
})
</script>

<template>
  <StickyHeader />
  <NavigationBar />
  <CommonHeader />
  <!-- 添加key，强制刷新 -->
  <!-- <RouterView :key="$route.fullPath"/> -->
  <RouterView />
  <CommonFooter />
</template>
