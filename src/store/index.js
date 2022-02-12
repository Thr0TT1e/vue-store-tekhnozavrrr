import { createStore } from 'vuex';
import axios from 'axios';
import { API_BASE_URL } from '@/config.js';

const store = createStore(
  {
    state() {
      return {
        cartProducts:         [],
        userAccessKey:        null,
        cartProductsData:     [],
        productLoading:       false,
        productLoadingFailed: false,
        orderInfo:            {},
      }
    },

    getters: {
      cartDetailsProduct(state) {
        if (state.cartProducts) {
          return state.cartProducts
        }
      },

      cartTotalPrice(state, getters) {
        return getters.cartDetailsProduct.reduce((acc, item) => acc + item.product.price * item.amount, 0)
      },

      amountProduct(state, getters) {
        return getters.cartDetailsProduct.reduce((acc, item) => item.amount + acc, 0)
      },

      resOrderInfo(state) {
        let amountAll = state.orderInfo.basket.items.reduce((acc, item) => acc + item.quantity, 0)
        return Object.assign({}, state.orderInfo, {amount: amountAll})
      },
    },

    mutations: {
      // Обновление ключа пользователя
      updateUserKey(state, key) {
        state.userAccessKey = key
      },

      updateCartProductsAmount(state, payload) {
          const item = state.cartProducts.find(product => product.id === payload.productId)

          if (item) {
            item.amount = payload.amount
          }
      },

      // Обновление товаров в корзине
      updateProductCart(state, items) {
        if (items.length) {
          state.cartProducts = items.map(item => {
            return {
              productId: item.product.id,
              product:   Object.assign({}, item.product, {image: item.product.image.file.url}),
              amount:    item.quantity,
            }
          })
        }
        else {
          state.cartProducts = items
        }
      },

      deleteProductCart(state, productId) {
        state.cartProducts = state.cartProducts.filter(product => product.id !== productId)
      },

      resetProductCart(state, payload) {
        state.cartProducts = payload
      },

      syncOrderInfo(state, payload) {
        state.orderInfo = payload
      },

      loadOrderInfo(state, data) {
        state.orderInfo = data
      },
    },

    actions: {
      addProductToCart({commit, state}, product) {
        state.productLoading = true
        state.productLoadingFailed = false

        clearTimeout(this.loadProductsTimer)
        this.loadProductsTimer = setTimeout(() => {
          return axios.post(`${API_BASE_URL}/api/baskets/products`, {
              productId: product.productId,
              quantity:  product.amount,
            },
            {
              params: {
                userAccessKey: state.userAccessKey,
              },
            })
                      .then(res => commit('updateProductCart', res.data.items))
                      .catch(err => {
                        state.productLoadingFailed = false
                        console.log('addProductToCart -> ', err)
                      })
                      .then(() => state.productLoading = false)
        }, 0)
      },

      changeProductAmount({commit, state}, product) {
        if (product.amount < 1) {
          return
        }

        commit('updateCartProductsAmount', product)

        return axios.put(`${API_BASE_URL}/api/baskets/products`, {
                           productId: product.productId,
                           quantity:  product.amount,
                         },
                         {
                           params: {
                             userAccessKey: state.userAccessKey,
                           },
                         })
                    .then(res => commit('updateProductCart', res.data.items))
                    .catch(err => console.log('changeProductAmount -> ', err))
      },

      deleteProductToCart({commit, state}, productId) {
        commit('deleteProductCart', productId)

        return axios.delete(`${API_BASE_URL}/api/baskets/products`, {
                              data: {productId: productId},
            params: {
              userAccessKey: state.userAccessKey,
            },
                            })
                    .then(res => commit('updateProductCart', res.data.items))
                    .catch(err => console.log('deleteProductToCart -> ', err))
      },

      fetchLoadCart({commit, state}) {
        state.productLoading = true
        state.productLoadingFailed = false

        clearTimeout(this.loadProductsTimer)
        this.loadProductsTimer = setTimeout(() => {
          return axios.get(`${API_BASE_URL}/api/baskets`, {
            params: {
              userAccessKey: state.userAccessKey,
            },
          })
                      .then(res => {
                        if (!state.userAccessKey) {
                          localStorage.setItem('userAccessKey', res.data.user.accessKey)
                          commit('updateUserKey', res.data.user.accessKey)
                        }

                        commit('updateProductCart', res.data.items)
                      })
                      .catch(err => {
                        state.productLoadingFailed = true
                        console.log('fetchLoadCart -> ', err)
                      })
                      .then(() => state.productLoading = false)
        }, 0)
      },

      cleanProductCart({commit}) {
        commit('resetProductCart', [])
      },

      addOrderInfo({commit}, data) {
        commit('syncOrderInfo', data)
      },

      fetchOrderInfo({commit, state}, orderId) {

        console.log("orderId ->", orderId);
        return axios.get(`${API_BASE_URL}/api/orders/${orderId}`, {
          params: {
            userAccessKey: state.userAccessKey,
          },
        })
             .then(res => commit('loadOrderInfo', res.data))
             .catch(err => console.log('fetchOrderInfo => ', err))
      },
    },
  })

export default store