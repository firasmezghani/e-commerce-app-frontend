<template>
  <div class="cart">
    <h1>Your Cart</h1>

    <div v-if="cart.length === 0" class="empty-message">Your cart is empty.</div>

    <div v-else class="cart-items">
      <div class="cart-item" v-for="item in cart" :key="item.id || item._id">
        <h3>{{ item.name }}</h3>
        <p>Price: ${{ item.price }}</p>

        <div class="quantity-controls">
          <button @click="decreaseQuantity(item.id || item._id)">-</button>
          <span>{{ item.quantity }}</span>
          <button @click="increaseQuantity(item.id || item._id)">+</button>
        </div>

        <p>Total: ${{ item.price * item.quantity }}</p>
        <button class="remove-btn" @click="removeFromCart(item.id || item._id)">Remove</button>
      </div>

      <div class="cart-summary">
        <p><strong>Total: ${{ cartTotal }}</strong></p>
        <button class="checkout-button" @click="handleCheckout">Checkout</button>
        <button class="paypal-button" @click="handlePayPal">
<img src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg" alt="PayPal" class="paypal-logo" />
  Pay with PayPal
</button>
      </div>
    </div>

    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <h2>Order Confirmed</h2>
        <p>Your pickup code:</p>
        <div class="pickup-code">{{ pickupCode }}</div>
        <p class="warning">This code will not be shown again. Please note it now.</p>
        <button class="close-btn" @click="closeModal">Close</button>
      </div>
    </div>

    <div v-if="toast.message" :class="['toast', toast.success ? 'success' : 'error']">
      {{ toast.message }}
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import axios from 'axios';

export default {
  data() {
    return {
      pickupCode: '',
      showModal: false,
      toast: {
        message: '',
        success: false
      }
    };
  },
  computed: {
    ...mapState(['cart']),
    ...mapGetters(['cartTotal'])
  },
  methods: {
    ...mapMutations([
      'removeFromCart',
      'clearCart',
      'increaseQuantity',
      'decreaseQuantity'
    ]),

    showToast(message, success = true) {
      this.toast = { message, success };
      setTimeout(() => (this.toast.message = ''), 3000);
    },

    async handleCheckout() {
      const token = localStorage.getItem('token');
      if (!token || token === 'undefined' || token.trim() === '') {
        this.$router.push('/login');
        return;
      }
      await this.checkout();
    },

    handlePayPal() {
  const token = localStorage.getItem('token');
  if (!token || token === 'undefined' || token.trim() === '') {
    this.$router.push('/login');
    return;
  }
 
  this.$router.push('/checkout');
},

    async checkout() {
      const token = localStorage.getItem('token');
      if (!token || token === 'undefined' || token.trim() === '') {
        this.$router.push('/login');
        return;
      }

      try {
        const order = {
          items: this.cart,
          total: this.cartTotal
        };

        await axios.post('http://localhost:5050/api/orders', order, {
          headers: { Authorization: `Bearer ${token}` }
        });

        this.pickupCode = this.generatePickupCode();
        this.showModal = true;
        this.clearCart();
        this.showToast('Order placed successfully.');
      } catch (err) {
        console.error('Checkout error:', err);
        this.showToast('Failed to place the order.', false);
      }
    },

    generatePickupCode() {
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const digits = '0123456789';
      let code = '';

      for (let i = 0; i < 3; i++) code += digits[Math.floor(Math.random() * digits.length)];
      for (let i = 0; i < 3; i++) code += letters[Math.floor(Math.random() * letters.length)];

      return code;
    },

    closeModal() {
      this.showModal = false;
    }
  }
};
</script>

<style scoped>
.cart {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background: #f7f7f7;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.empty-message {
  font-size: 1.2em;
  text-align: center;
  margin-top: 30px;
}

.cart-item {
  background: white;
  padding: 20px;
  margin-bottom: 15px;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px 0;
}

.remove-btn {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 5px;
  cursor: pointer;
}

.cart-summary {
  margin-top: 30px;
  text-align: center;
}

.checkout-button {
  background: #2ecc71;
  color: white;
  padding: 10px 20px;
  margin-right: 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

.paypal-button {
  background: #ffc439;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
}

.paypal-logo {
  height: 24px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  width: 90%;
  max-width: 400px;
}

.pickup-code {
  font-size: 1.8rem;
  font-weight: bold;
  margin: 20px 0;
  color: #2c3e50;
}

.warning {
  font-size: 0.95rem;
  color: #c0392b;
  margin-bottom: 20px;
}

.close-btn {
  background-color: #2c3e50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

.toast {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px 24px;
  border-radius: 6px;
  font-weight: bold;
  color: white;
  z-index: 9999;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
.toast.success {
  background-color: #2ecc71;
}
.toast.error {
  background-color: #e74c3c;
}
</style>
