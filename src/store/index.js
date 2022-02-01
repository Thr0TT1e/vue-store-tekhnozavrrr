import { createStore } from 'vuex';
import products from '@/data/products';

const store = createStore({
  state() {
    return {
      cartProducts: [
        {
          productId: 1,
          amount: 2
        }
      ],

    }
  },

  getters: {
    cartDetailsProduct(state) {
      return state.cartProducts.map(product => {
        return {
          ...product,
          product: products.find(item => item.id === product.productId)
        }
      })
    },

    cartTotalPrice(state, getters) {
      return getters.cartDetailsProduct.reduce((acc, item) => acc + item.product.price * item.amount, 0)
    },
  },

  mutations: {
    addProduct(state, payload) {
      let item = state.cartProducts.find(item => item.productId === payload.productId)

      if (item) item.amount += payload.amount
      else state.cartProducts.push(payload)
    },

    changeAmount(state, payload) {
      let item = state.cartProducts.find(item => item.productId === payload.productId)

      if (item) item.amount = payload.amount
    },

    deleteProductToCart(state, productId) {
      state.cartProducts = state.cartProducts.filter(product => product.productId !== productId)
    },
  },

  actions: {
    addProductToCart({commit}, product) {
      commit('addProduct', product)
    },

    changeProductAmount({commit}, amount) {
      commit('changeAmount', amount)
    },

    deleteProductToCart({commit}, productId) {
      commit('deleteProductToCart', productId)
    },
  },
})

export default store