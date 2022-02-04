<template>
  <li class="catalog__item">
    <router-link
        class="catalog__pic"
        :to="{
          name: 'Product',
          params: {
            id: product.id
          }
        }"
    >
      <img
          :src="product.image"
          srcset="img/radio@2x.jpg 2x"
          :alt="product.title"
      >
    </router-link>
    
    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>
    
    <span class="catalog__price">{{ product.price.toLocaleString('ru-RU') }} ₽</span>
    
    <ul class="colors colors--black">
      <li class="colors__item" v-for="color in product.colors" :key="color.id">
        <label class="colors__label">
          <input
              class="colors__radio sr-only"
              type="radio"
              :value="color.code"
              v-model="colorD"
          >
          <span class="colors__value" :style="`background-color: ${color.code};`">
                  </span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'ProductItem',
  
  props: ['product'],
  
  data() {
    return {
      colorD: '',
    }
  },
}
</script>

<style scoped>

</style>