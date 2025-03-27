<template>
  <div class="product-details" v-if="product">
    <h1>{{ product.name }}</h1>
    <img :src="product.image" alt="Product Image" class="product-image" />
    <p><strong>Price:</strong> ${{ product.price }}</p>
    <p><strong>Description:</strong> {{ product.description }}</p>
    <button @click="addToCart(product)">Add to Cart</button>
  </div>
</template>

<script>
import axios from 'axios';
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      product: null
    };
  },
  methods: {
    ...mapMutations(['addToCart']),
    async fetchProduct() {
      const id = this.$route.params.id;
      try {
        const res = await axios.get(`http://localhost:5050/api/products/${id}`);
        this.product = res.data;
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }
  },
  mounted() {
    this.fetchProduct();
  }
};
</script>

<style>
.product-details {
  max-width: 600px;
  margin: auto;
  text-align: center;
}

.product-image {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
}

button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-top: 15px;
  cursor: pointer;
}
</style>
