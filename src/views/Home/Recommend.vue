<script setup>
import { getRecommendThings } from '@/apis/home';
import Panal from '@/views/components/Panal.vue';
import { onMounted,ref } from 'vue';

const list = ref([])

const queryRecommendThings = async () => {
  const { data } = await getRecommendThings();
  list.value = data.result;
};

onMounted(() => {
    queryRecommendThings();
});
</script>

<template>
    <Panal title="人气推荐" sub-title="人气爆款 不容错过">
        <ul class="goods-list">
          <li v-for="item in list" :key="item.id">
            <RouterLink to="/">
              <img v-lazy-img="item.picture" alt="">
              <p class="name">{{ item.title }}</p>
              <p class="desc">{{ item.alt }}</p>
            </RouterLink>
          </li>
        </ul>
    </Panal>
  </template>


<style scoped lang='scss'>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;

  li {
    width: 306px;
    height: 406px;
    transition: all .5s;

    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    }

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }

    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>