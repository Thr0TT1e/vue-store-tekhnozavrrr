<template>
  <router-link
      class="header__cart"
      :to="{name: 'Cart'}"
      aria-label="Корзина с товарами"
  >
    <svg width="30" height="21" fill="currentColor">
      <use xlink:href="#icon-cart"></use>
    </svg>
    <span class="header__count" aria-label="Количество товаров">{{ amountTotal }}</span>
  </router-link>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'CartIndicator',

  computed: {
    ...mapGetters({amountTotal: 'amountProduct' })
  },
}
</script>

<style scoped>

</style>