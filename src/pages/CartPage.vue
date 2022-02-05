<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'Main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>
      
      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        {{ amountTotal }} товара
      </span>
    </div>
    
    <section class="cart">

      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">

            <li class="catalog__spiner" v-if="productLoading"><img src="img/svg/25.svg"></li>

            <li class="catalog__spiner" v-if="productLoadingFailed">
              Произошла ошибка при загрузке товаров!
            </li>

            <CartItem
                v-for="item in products"
                :key="item.productId"
                :item="item"
                v-else
            />
          </ul>
        </div>
        
        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ totalPrice.toLocaleString() }} ₽</span>
          </p>
          
          <router-link
              tag="button"
              class="cart__button button button--primery"
              type="submit"
              v-if="products.length !== 0"
              :to="{ name: 'Order' }"
          >
            Оформить заказ
          </router-link>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import CartItem from '@/components/CartItem.vue';
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'CartPage',
  
  components: {
    CartItem,
  },
  
  computed: {
    ...mapGetters({
                    products:    'cartDetailsProduct',
                    totalPrice:  'cartTotalPrice',
                    amountTotal: 'amountProduct',
                  }),
    ...mapState({productLoading: 'productLoading', productLoadingFailed: 'productLoadingFailed'})
  },
}
</script>

<style scoped>
.catalog__spiner {
  text-align: center;
}
</style>