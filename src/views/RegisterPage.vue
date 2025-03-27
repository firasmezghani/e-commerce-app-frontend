<template>
  <div class="auth-page">
    <h2>Register - {{ isAdmin ? 'Admin' : 'User' }}</h2>
    <form @submit.prevent="register">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <input
        v-if="isAdmin"
        v-model="adminCode"
        type="text"
        placeholder="Admin Code (Required)"
        required
      />
      <button type="submit">Register</button>
      <p v-if="message">{{ message }}</p>
    </form>
    <button class="switch-btn" @click="isAdmin = !isAdmin">
      Switch to {{ isAdmin ? 'User' : 'Admin' }} Register
    </button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RegisterPage',
  data() {
    return {
      email: '',
      password: '',
      adminCode: '',
      isAdmin: false,
      message: ''
    };
  },
  methods: {
    async register() {
      try {
        const role = this.isAdmin ? 'admin' : 'user';

        await axios.post('http://localhost:5050/api/auth/register', {
          email: this.email,
          password: this.password,
          role,
          adminCode: this.adminCode
        });

        this.message = 'Account created. You can now log in.';
        this.email = '';
        this.password = '';
        this.adminCode = '';
      } catch (err) {
        this.message = err.response?.data?.message || 'Registration failed.';
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
</style>
