<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        {{ countProducts }} товара
      </span>
    </div>

    <div class="content__catalog">
      <ProductFilter />

      <section class="catalog">
        <ProductList :products="products"/>

        <BasePagination v-model:page="page" :count="countProducts" :per-page="productPerPage" />
      </section>

    </div>
  </main>
</template>

<script>
import products from '@/data/products.js';
import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination';
import ProductFilter from '@/components/ProductFilter';

export default {
  name: 'App',
  
  data() {
    return {
      page: 1,
      productPerPage: 3,
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
    }
  },
  
  components: {
    ProductList,
    BasePagination,
    ProductFilter,
  },

  computed: {
    products() {
      const offset = (this.page - 1) * this.productPerPage

      return this.filterProducts.slice(offset, offset + this.productPerPage)
    },

    countProducts() {
      return products.length
    },

    filterProducts() {
      let filterProducts = products

      if (this.filterPriceFrom > 0) {
        filterProducts = filterProducts.filter(product => product.price >= this.filterPriceFrom)
        console.log("-> filterProducts", filterProducts);
      }

      if (this.filterPriceTo > 0) {
        filterProducts = filterProducts.filter(product => product.price <= this.filterPriceTo)
      }

      if (this.filterCategoryId) {
        filterProducts = filterProducts.filter(product => product.categoryId === this.filterCategoryId)
      }

      return filterProducts
    },
  },
}
</script>

<style>
</style>
