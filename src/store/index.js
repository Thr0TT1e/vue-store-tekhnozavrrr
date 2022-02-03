import { createStore } from 'vuex';
import axios from 'axios';
import { API_BASE_URL } from '@/config.js';

const store = createStore(
  {
    state() {
      return {
        cartProducts:     [],
        userAccessKey:    null,
        cartProductsData: [],
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
    },

    mutations: {
      // Обновление ключа пользователя
      updateUserKey(state, key) {
        state.userAccessKey = key
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
    },

    actions: {
      addProductToCart({commit, state}, product) {
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
      },

      changeProductAmount({commit, state}, product) {
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
      },

      deleteProductToCart({commit, state}, productId) {
        return axios.delete(`${API_BASE_URL}/api/baskets/products`, {
                              productId: productId,
                            },
                            {
                              params: {
                                userAccessKey: state.userAccessKey,
                              },
                            })
                    .then(res => commit('updateProductCart', res.data.items))
      },

      fetchLoadCart({commit, state}) {
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
                      // commit('syncCartProducts')
                    })
                    .catch(err => console.log('fetchLoadCart -> ', err))
      },
    },
  })

export default store