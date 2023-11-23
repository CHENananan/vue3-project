<script setup>
import Category from './components/Category.vue';
import Banner from './components/Banner.vue';
import New from './components/New.vue';
import Product from './components/Product.vue';
import Hot from './components/Hot.vue';

</script>

<template>
    <div class="container">
      <Category />
      <Banner />
    </div>
    <New />
    <Hot />
    <Product />
</template>