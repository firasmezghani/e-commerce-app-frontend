<template>
  <div class="add-product">
    <h1>Add New Product</h1>
    <form @submit.prevent="submitForm">
      <label>Name:</label>
      <input v-model="product.name" required />
 
      <label>Description:</label>
      <input v-model="product.description" required />
 
      <label>Price:</label>
      <input v-model="priceInput" type="text" required />
 
      <label>Image (URL or name):</label>
      <input v-model="product.image" />
 
      <button type="submit">Add Product</button>
    </form>
    <router-link to="/products">Back to Products</router-link>
  </div>
</template>
 
<script>
import axios from "axios";
 
export default {
  data() {
    return {
      product: {
        name: "",
        description: "",
        price: null,
        image: ""
      },
      priceInput: "" // Input field for price as string
    };
  },
  methods: {
    async submitForm() {
      const cleanedPrice = this.priceInput.replace(',', '.');
      const price = parseFloat(cleanedPrice);
 
      if (isNaN(price)) {
        alert("Please enter a valid price.");
        return;
      }
 
      this.product.price = price;
 
      try {
        const response = await axios.post("http://localhost:5050/api/products", this.product);
        console.log(response.data);
        alert("Product added successfully.");
        this.$router.push("/products");
      } catch (error) {
        console.error("Error adding product:", error);
        alert("Failed to add product.");
      }
    }
  }
};
</script>
 
<style>
.add-product {
  max-width: 400px;
  margin: auto;
}
input {
  display: block;
  margin-bottom: 10px;
  width: 100%;
  padding: 8px;
}
button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
}
</style>