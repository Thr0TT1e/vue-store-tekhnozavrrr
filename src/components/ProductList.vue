<template>
  <ul class="catalog__list">
    <ProductItem :products="products"/>
  </ul>
</template>

<script>
import ProductItem from '@/components/ProductItem.vue';

export default {
  name: 'ProductList',
  
  props: ['products'],
  
  components: {
    ProductItem
  }
}
</script>

<style scoped>

</style>