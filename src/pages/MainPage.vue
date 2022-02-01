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
      <ProductFilter
          v-model:price-from="filterPriceFrom"
          v-model:price-to="filterPriceTo"
          v-model:category-id="filterCategoryId"
          v-model:select-color="filterColor"
          @page-one="page = $event"
      />
      
      <section class="catalog">
        <ProductList
            :products="products"
            @gotoPage="(pageName, pageParams) => $emit('gotoPage', pageName, pageParams)"
        />
        
        <BasePagination
            v-model:page="page"
            :count="countProducts"
            :per-page="productPerPage"
        />
      </section>
    
    </div>
  </main>
</template>

<script>
import products from '@/data/products.js';
import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination';
import ProductFilter from '@/components/ProductFilter';
import axios from 'axios';

export default {
  name: 'MainPage',
  
  data() {
    return {
      page:             1,
      productPerPage:   3,
      filterPriceFrom:  0,
      filterPriceTo:    0,
      filterCategoryId: 0,
      filterColor:      '',
      productsData:     null,
    }
  },
  
  components: {
    ProductList,
    BasePagination,
    ProductFilter,
  },
  
  created() {
    this.loadProducts()
  },
  
  computed: {
    products() {
      return this.productsData
          ? this.productsData.items.map(product => {
            return {
              ...product,
              image: product.image.file.url,
            }
          })
          : []
    },
    
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0
    },
    
    filterProducts() {
      let filterProducts = products
      
      if (this.filterPriceFrom > 0) {
        filterProducts = filterProducts.filter(product => product.price >= this.filterPriceFrom)
      }
      
      if (this.filterPriceTo > 0) {
        filterProducts = filterProducts.filter(product => product.price <= this.filterPriceTo)
      }
      
      if (this.filterCategoryId) {
        filterProducts = filterProducts.filter(product => product.categoryId === this.filterCategoryId)
      }
      
      if (this.filterColor) {
        filterProducts = filterProducts.filter(product => {
          if (product.colors && product.colors.includes(this.filterColor)) return product
        })
      }
      
      return filterProducts
    },
  },
  
  watch: {
    page() {
      this.loadProducts()
    },
  },
  
  methods: {
    loadProducts() {
      axios.get(`https://vue-study.skillbox.cc/api/products?page=${this.page}&limit=${this.productPerPage}`)
           .then(res => this.productsData = res.data)
    },
  },
}
</script>

<style scoped>

</style>