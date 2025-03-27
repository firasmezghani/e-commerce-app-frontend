import { createStore } from 'vuex';

export default createStore({
  state: {
    isAdmin: true, 
    products: [
      { id: 1, name: "Product A", price: 10 },
      { id: 2, name: "Product B", price: 20 },
      { id: 3, name: "Product C", price: 30 },
    ],
    cart: [],
  },

  mutations: {
    addToCart(state, product) {
      const productId = product.id || product._id;
      const item = state.cart.find((p) => p.id === productId || p._id === productId);

      if (item) {
        item.quantity++;
      } else {
        state.cart.push({ ...product, id: productId, quantity: 1 });
      }
    },

    removeFromCart(state, productId) {
      state.cart = state.cart.filter((p) => (p.id || p._id) !== productId);
    },

    clearCart(state) {
      state.cart = [];
    },

    increaseQuantity(state, productId) {
      const item = state.cart.find((p) => (p.id || p._id) === productId);
      if (item) {
        item.quantity++;
      }
    },

    decreaseQuantity(state, productId) {
      const item = state.cart.find((p) => (p.id || p._id) === productId);
      if (item && item.quantity > 1) {
        item.quantity--;
      } else {
        state.cart = state.cart.filter((p) => (p.id || p._id) !== productId);
      }
    }
  },

  getters: {
    cartTotal(state) {
      return state.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    },
    cartItemCount(state) {
      return state.cart.reduce((count, item) => count + item.quantity, 0);
    }
  }
});
