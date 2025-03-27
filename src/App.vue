<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/products">Products</router-link> |
      <router-link to="/cart">Cart</router-link> |
      <router-link v-if="role === 'admin'" to="/add-product">Add Product</router-link> |
      <router-link v-if="isLoggedIn" to="/orders">My Orders</router-link>
      <router-link v-if="!isLoggedIn" to="/login">Login</router-link> |
      <router-link v-if="!isLoggedIn" to="/register">Register</router-link> |
      <a v-if="isLoggedIn" href="#" @click.prevent="logout">Logout</a>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      role: localStorage.getItem('role'),
      isLoggedIn: !!localStorage.getItem('token')
    };
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('email');
      localStorage.removeItem('userId');

      this.role = null;
      this.isLoggedIn = false;
      this.$router.push('/dashboard');
      window.location.reload();
    }
  },
  watch: {
    $route() {
      this.role = localStorage.getItem('role');
      this.isLoggedIn = !!localStorage.getItem('token');
    }
  }
};
</script>

<style>
nav {
  background: #42b983;
  padding: 15px;
  text-align: center;
}
nav a {
  color: white;
  font-weight: bold;
  text-decoration: none;
  margin: 0 15px;
}
nav a.router-link-active {
  text-decoration: underline;
}
</style>
