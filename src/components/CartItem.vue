<template>
  
  <li class="cart__item product">
    <div class="product__pic">
      <img
          :src="item.product.image"
          width="120"
          height="120"
          srcset="img/phone-square-3@2x.jpg 2x"
          :alt="item.product.title"
      >
    </div>
    <h3 class="product__title">
      {{ item.product.title }}
    </h3>
    <p class="product__info">
      Объем: <span>128GB</span>
    </p>
    <span class="product__code">
                Артикул: {{ item.product.id }}
              </span>
    
    <div class="product__counter form__counter">
      <button
          class="button__amount"
          type="button"
          aria-label="Убрать один товар"
          @click.prevent="decrement"
      >
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-minus"></use>
        </svg>
      </button>
      
      <input
          class="form__input-nostyle"
          type="number"
          min="0"
          name="count"
          v-model.number="amount"
          @input="negativeMeaning($event)"
      >
      
      <button
          class="button__amount"
          type="button"
          aria-label="Добавить один товар"
          @click.prevent="increment"
      >
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-plus"></use>
        </svg>
      </button>
    </div>
    
    <b class="product__price">
      {{ (item.amount * item.product.price).toLocaleString() }} ₽
    </b>
    
    <button
        class="product__del button-del"
        type="button"
        aria-label="Удалить товар из корзины"
        @click.prevent="deleteProduct(item.product.id)"
    >
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'CartItem',
  
  props: ['item'],
  
  computed: {
    amount: {
      get() {
        return this.item.amount
      },
      
      set(value) {
        if (value) {
          this.changeProductAmount({
                                     productId: this.item.productId,
                                     amount:    value,
                                   })
        }
        else {
          return;
        }
      },
    },
  },
  
  methods: {
    ...mapActions({deleteProduct: 'deleteProductToCart', changeProductAmount: 'changeProductAmount'}),
    
    increment() {
      this.changeProductAmount({
                                 productId: this.item.productId,
                                 amount:    this.item.amount + 1,
                               })
    },
    
    decrement() {
      if (this.item.amount > 1) {
        this.changeProductAmount({
                                   productId: this.item.productId,
                                   amount:    Math.max(1, this.item.amount - 1),
                                 })
      }
    },
    
    negativeMeaning(event) {
      this.amount = Math.max(1, parseInt(event.target.value))
    },
  },
}
</script>

<style scoped>

</style>