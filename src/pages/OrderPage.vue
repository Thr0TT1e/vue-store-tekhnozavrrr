<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Каталог
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>
      
      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        3 товара
      </span>
    </div>
    
    <section class="cart">
      <form
          class="cart__form form"
          action="#"
          method="POST"
          @submit.prevent="order"
      >
        <div class="cart__field">
  
          <div class="catalog__spiner" v-if="productLoading"><img src="img/svg/25.svg"></div>
          
          <div class="cart__data" v-else>
            
            <BaseFormText
                title="ФИО"
                placeholder="Введите ваше полное имя"
                :error="formError.name"
                v-model:data-value="formData.name"
            />
            
            <BaseFormText
                title="Адрес доставки"
                placeholder="Введите ваш адрес"
                :error="formError.address"
                v-model:data-value="formData.address"
            />
            
            <BaseFormText
                title="Телефон"
                placeholder="Введите ваш телефон"
                type="tel"
                :error="formError.phone"
                v-model:data-value="formData.phone"
            />
            
            <BaseFormText
                title="Email"
                placeholder="Введи ваш Email"
                type="email"
                :error="formError.email"
                v-model:data-value="formData.email"
            />
            
            <BaseFormTextarea
                title="Комментарий к заказу"
                placeholder="Ваши пожелания"
                :error="formError.comment"
                v-model:data-value="formData.comment"
            />
          </div>
          
          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="0" checked="">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500">
                  <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>
            
            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>
        
        <div class="cart__block">
          <ul class="cart__orders">
            <li
                class="cart__order"
                v-for="item in products"
                :key="item.productId"
            >
              <h3>{{ item.product.title }}</h3>
              <b>{{ item.product.price.toLocaleString() }} ₽</b>
              <span>Артикул: {{ item.product.id }}</span>
            </li>
          </ul>
          
          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого: <b>{{ amountTotal }}</b> товара на сумму <b>{{ totalPrice.toLocaleString() }} ₽</b></p>
          </div>
          
          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
        <div
            class="cart__error form__error-block"
            v-if="formErrorMessage"
        >
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ formErrorMessage }}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import axios from 'axios';
import BaseFormText from '@/components/BaseFormText.vue';
import BaseFormTextarea from '@/components/BaseFormTextarea.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'OrderPage',
  
  components: {
    BaseFormText,
    BaseFormTextarea,
  },
  
  data() {
    return {
      formData:             {},
      formError:            {},
      formErrorMessage:     '',
      productLoading:       false,
    }
  },
  
  computed: {
    ...mapGetters({
                    products:    'cartDetailsProduct',
                    totalPrice:  'cartTotalPrice',
                    amountTotal: 'amountProduct',
                  }),
  },
  
  methods: {
    ...mapActions(['cleanProductCart', 'addOrderInfo']),
  
    order() {
      this.formError            = {}
      this.formErrorMessage     = ''
      this.productLoading       = true
    
      axios.post(`${this.API_BASE_URL}/api/orders`,
                 {
                   ...this.formData,
                 },
                 {
                   params: {
                     userAccessKey: this.$store.state.userAccessKey,
                   },
                 },
      )
           .then(res => {
             this.productLoading = false
             this.cleanProductCart()
             this.addOrderInfo(res.data)
             this.$router.push({
                                 name:   'OrderInfo',
                                 params: {id: res.data.id},
                               })
           })
           .catch(err => {
             this.formError        = err.response.data.error.request || {}
             this.formErrorMessage = err.response.data.error.message || ''
           })
           .then(() => this.productLoading = false)
    },
  },
}
</script>

<style scoped>
.catalog__spiner {
  text-align: center;
}
</style>