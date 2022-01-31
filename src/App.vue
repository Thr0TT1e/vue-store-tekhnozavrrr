<template>
  <component
      :is="currentPageComponent"
      :page-params="currentPageParams"
      @gotoPage="(pageName, pageParams) => gotoPage(pageName, pageParams)"
  />
</template>

<script>
import MainPage from '@/pages/MainPage.vue';
import ProductPage from '@/pages/ProductPage.vue';
import PageNotFound from '@/pages/404.vue';

const routes = {
  main:    'MainPage',
  product: 'ProductPage',
};

export default {
  name: 'App',
  
  components: {
    MainPage,
    ProductPage,
    PageNotFound,
  },
  
  data() {
    return {
      currentpage:       'main',
      currentPageParams: {},
    }
  },
  
  computed: {
    currentPageComponent() {
      return routes[this.currentpage] || 'PageNotFound'
    },
  },
  
  methods: {
    gotoPage(pageName, pageParams) {
      this.currentpage       = pageName
      this.currentPageParams = pageParams || {}
    },
  },
}
</script>

<style>
</style>
