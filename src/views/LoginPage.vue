<template>
  <div class="auth-page">
    <h2>Login - {{ isAdmin ? 'Admin' : 'User' }}</h2>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
    <button class="switch-btn" @click="isAdmin = !isAdmin">
      Switch to {{ isAdmin ? 'User' : 'Admin' }} Login
    </button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      error: '',
      isAdmin: false
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:5050/api/auth/login', {
          email: this.email,
          password: this.password
        });

        const { token, role, userId } = response.data;

        if ((this.isAdmin && role !== 'admin') || (!this.isAdmin && role !== 'user')) {
          this.error = 'Unauthorized role.';
          return;
        }

        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        localStorage.setItem('userId', userId);
        localStorage.setItem('email', this.email);

        this.$router.push('/');
      } catch (err) {
        this.error = 'Invalid credentials';
      }
    }
  }
};
</script>

<style scoped>
.auth-page {
  max-width: 400px;
  margin: 100px auto;
  text-align: center;
}

input {
  display: block;
  width: 100%;
  padding: 10px;
  margin: 15px 0;
}

button {
  padding: 10px 20px;
  margin-top: 10px;
  background: #42b983;
  border: none;
  color: white;
  cursor: pointer;
}

.switch-btn {
  background: #333;
}

.error {
  color: red;
}
</style>
