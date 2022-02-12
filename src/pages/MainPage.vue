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
          v-model:select-color="filterColorId"
          @page-one="page = $event"
      />
      
      <section class="catalog">
        
        <div class="catalog__spiner" v-if="productLoading"><img src="img/svg/25.svg"></div>
        
        <div class="catalog__spiner" v-if="productLoadingFailed">
          Произошла ошибка при загрузке товаров!
          <button @click.prevent="loadProducts">Попробовать ещё раз</button>
        </div>
        
        <ProductList
            v-else
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
import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination';
import ProductFilter from '@/components/ProductFilter';
import axios from 'axios';

export default {
  name: 'MainPage',
  
  data() {
    return {
      page:                 1,
      productPerPage:       12,
      filterPriceFrom:      0,
      filterPriceTo:        0,
      filterCategoryId:     0,
      filterColorId:        0,
      productsData:         null,
      productLoading:       false,
      productLoadingFailed: false,
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
  },
  
  watch: {
    page() {
      this.loadProducts()
    },
    
    filterPriceFrom() {
      this.loadProducts()
    },
    
    filterPriceTo() {
      this.loadProducts()
    },
    
    filterCategoryId() {
      this.loadProducts()
    },
  
    filterColorId() {
      this.loadProducts()
    },
  },
  
  methods: {
    loadProducts() {
      this.productLoading       = true
      this.productLoadingFailed = false
      clearTimeout(this.loadProductsTimer)
      this.loadProductsTimer = setTimeout(() => {
        axios.get(`${this.API_BASE_URL}/api/products`, {
          params: {
            page:       this.page,
            limit:      this.productPerPage,
            categoryId: this.filterCategoryId,
            colorId:    this.filterColorId,
            minPrice:   this.filterPriceFrom,
            maxPrice:   this.filterPriceTo,
          },
        })
             .then(res => this.productsData = res.data)
             .catch(() => this.productLoadingFailed = true)
             .then(() => this.productLoading = false)
      }, 0)
    },
  },
}
</script>

<style scoped>
.catalog__spiner {
  display:            grid;
  grid-template-rows: 400px;
  place-items:        center;
}
</style>