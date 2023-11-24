<script setup>
import ProductItem from '@/views/components/ProductItem.vue';
import { getFilterCategories,getSubCategories} from '@/apis/category'
import {ref,onMounted} from 'vue'
import {useRoute} from 'vue-router'

const route = useRoute()

const categoryData = ref([])

const queryFilterCategoryData = async (id) => {
  const {data} = await getFilterCategories(id)
  categoryData.value = data.result
}

onMounted(() => {
  queryFilterCategoryData(route.params.id)
})

const goodList = ref([])

const params = ref({
    categoryId: route.params.id,
    page: 1,
    pageSize: 20,
    sortField: 'publishTime',
})

const querySubCategoryData = async (params) => {
  const {data} = await getSubCategories(params)
  goodList.value = data.result.items
  pageData.value = {
    page:data.result.page,
    pages:data.result.pages,
    pageSize:data.result.pageSize
    }
}

onMounted(() => {
    querySubCategoryData(params.value)
})

const handleToChangeTab = () => {
    params.value.page = 1
    querySubCategoryData(params.value)
}

const disabledLoad = ref(false)

const pageData = ref({})
// 待优化
const onLoadMore =async () => {
    params.value.page++

    if(params.value.page > pageData.value.pages) {
        disabledLoad.value = true
        return
    }

    const {data} = await getSubCategories(params.value)
        goodList.value = [...goodList.value, ...data.result.items]
        pageData.value = {
        page:data.result.page,
        pages:data.result.pages,
        pageSize:data.result.pageSize
    }

    // 停止加载
    if (data.result.items.length === 0) {
        disabledLoad.value === true
    }
}
</script>

<template>
  <div class="container ">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${categoryData.parentId}` }"> {{ categoryData.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs v-model="params.sortField" @tab-change="handleToChangeTab">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div class="body" v-infinite-scroll="onLoadMore"  :infinite-scroll-disabled="disabledLoad">
         <!-- 商品列表-->
        <ProductItem v-for="item in goodList" :key="item.id" :name="item.name"  :desc="item.desc" :price="item.price" :picture="item.picture" :id="item.id"/>
      </div>
    </div>
  </div>

</template>



<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }


}
</style>