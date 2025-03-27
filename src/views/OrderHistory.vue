<template>
  <div class="order-history">
    <h1 v-if="isAdmin">All Orders</h1>
    <h1 v-else>My Orders</h1>

    <div v-if="orders.length === 0">No orders found.</div>

    <div v-else>
      <div v-for="(order, index) in orders" :key="index" class="order-card">
        <h3>Order from {{ new Date(order.createdAt).toLocaleString() }}</h3>
        <ul>
          <li v-for="(item, i) in order.items" :key="i">
            {{ item.name }} x{{ item.quantity }} – ${{ item.price * item.quantity }}
          </li>
        </ul>
        <p><strong>Total:</strong> ${{ order.total }}</p>
        <p><strong>Email:</strong> {{ order.userEmail }}</p>
        <p><strong>Status:</strong> {{ order.status || 'pending' }}</p>

        <div v-if="isAdmin" class="admin-actions">
          <select v-model="order.status">
            <option>pending</option>
            <option>delivered</option>
            <option>cancelled</option>
          </select>
          <button @click="updateStatus(order._id, order.status)">Update</button>
          <button @click="deleteOrder(order._id)" class="danger">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'OrderHistory',
  data() {
    return {
      orders: [],
      isAdmin: false
    };
  },
  async mounted() {
    await this.fetchOrders();
  },
  methods: {
    async fetchOrders() {
      const email = localStorage.getItem('email');
      const role = localStorage.getItem('role');
      this.isAdmin = role === 'admin';

      try {
        const url = this.isAdmin
          ? 'http://localhost:5050/api/orders'
          : `http://localhost:5050/api/orders/user/${email}`;
        const res = await axios.get(url);
        this.orders = res.data;
      } catch (err) {
        console.error('Error fetching orders:', err);
      }
    },
    async updateStatus(id, newStatus) {
      try {
        await axios.put(`http://localhost:5050/api/orders/${id}`, { status: newStatus });
        alert(' Status updated!');
        await this.fetchOrders(); 
      } catch (err) {
        console.error('Error updating status:', err);
        alert(' Failed to update status.');
      }
    },
    async deleteOrder(id) {
      try {
        if (!confirm('Are you sure you want to delete this order?')) return;
        await axios.delete(`http://localhost:5050/api/orders/${id}`);
        this.orders = this.orders.filter(order => order._id !== id);
        alert(' Order deleted.');
      } catch (err) {
        console.error('Error deleting order:', err);
        alert(' Failed to delete order.');
      }
    }
  }
};
</script>

<style scoped>
.order-history {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}
.order-card {
  background: #f9f9f9;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}
.admin-actions {
  margin-top: 10px;
  display: flex;
  gap: 10px;
  align-items: center;
}
.admin-actions button {
  padding: 6px 12px;
  border-radius: 5px;
  cursor: pointer;
  background: #3498db;
  color: white;
  border: none;
  font-weight: bold;
}
.admin-actions .danger {
  background-color: #e74c3c;
}
</style>