<script setup>
import {onMounted} from 'vue'

import {useCategoryStore} from '@/stores/category'

import LayoutNav from './components/LayoutNav.vue'
import LayoutSticky from './components/LayoutSticky.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'

const categoryStore = useCategoryStore()

onMounted(() => {
  categoryStore.queryCategory()
})

</script>

<template>
  <LayoutSticky />
  <LayoutNav />
  <LayoutHeader />
  <RouterView />
  <LayoutFooter />
</template>