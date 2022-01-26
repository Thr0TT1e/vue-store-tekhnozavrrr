<template>
  <section class="catalog">
    
    <ProductList :products="products"/>
    
    <BasePagination v-model:page="page" :count="countProducts" :per-page="productPerPage" />
  </section>
</template>

<script>
import products from '@/data/products.js';
import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination';

export default {
  name: 'App',
  
  data() {
    return {
      page: 1,
      productPerPage: 3,
    }
  },
  
  components: {
    ProductList,
    BasePagination,
  },

  computed: {
    products() {
      const offset = (this.page - 1) * this.productPerPage

      return products.slice(offset, offset + this.productPerPage)
    },

    countProducts() {
      return products.length
    },
  },
}
</script>

<style>
</style>
