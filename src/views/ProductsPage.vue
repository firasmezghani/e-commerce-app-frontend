<template>
  <div class="products">
    <h1>Products</h1>

    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search products..."
      @input="searchProducts"
      class="search-bar"
    />

    <div v-if="products.length === 0">No products found.</div>
    <div class="product-list">
      <div class="product-card" v-for="product in products" :key="product._id">
        <div class="image-wrapper">
          <img :src="product.image" alt="Product Image" />
        </div>
        <h2>{{ product.name }}</h2>
        <p>{{ product.description }}</p>
        <p class="price">${{ product.price }}</p>
        <button @click="addToCartWithFeedback(product)">Add to Cart</button>

        <div v-if="isAdmin" class="admin-controls">
          <button class="edit-btn" @click="openEditModal(product)">Edit</button>
          <button class="delete-btn" @click="deleteProduct(product._id)">Delete</button>
        </div>
      </div>
    </div>

    <div v-if="showToast" class="toast">Product added to cart.</div>

    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <h3>Edit Product</h3>
        <input v-model="editableProduct.name" placeholder="Name" />
        <input v-model.number="editableProduct.price" placeholder="Price" />
        <input v-model="editableProduct.image" placeholder="Image URL" />
        <textarea v-model="editableProduct.description" placeholder="Description"></textarea>
        <button @click="updateProduct">Update</button>
        <button @click="showModal = false">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      products: [],
      searchQuery: '',
      showToast: false,
      showModal: false,
      editableProduct: {}
    };
  },
  computed: {
    isAdmin() {
      return localStorage.getItem('role') === 'admin';
    }
  },
  methods: {
    ...mapMutations(['addToCart']),

    async fetchProducts() {
      try {
        const res = await axios.get('http://localhost:5050/api/products');
        this.products = res.data;
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    },

    async searchProducts() {
      if (this.searchQuery.trim() === '') {
        this.fetchProducts();
        return;
      }
      try {
        const res = await axios.get(`http://localhost:5050/api/products/search?q=${this.searchQuery}`);
        this.products = res.data;
      } catch (err) {
        console.error('Search failed:', err);
      }
    },

    addToCartWithFeedback(product) {
      this.addToCart(product);
      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
      }, 2000);
    },

    async deleteProduct(productId) {
      if (confirm('Are you sure you want to delete this product?')) {
        try {
          await axios.delete(`http://localhost:5050/api/products/${productId}`);
          this.fetchProducts();
        } catch (err) {
          console.error('Delete failed:', err);
        }
      }
    },

    openEditModal(product) {
      this.editableProduct = { ...product };
      this.showModal = true;
    },

    async updateProduct() {
      try {
        await axios.put(`http://localhost:5050/api/products/${this.editableProduct._id}`, this.editableProduct);
        this.fetchProducts();
        this.showModal = false;
      } catch (err) {
        console.error('Update failed:', err);
      }
    }
  },
  mounted() {
    this.fetchProducts();
  }
};
</script>

<style scoped>
.products {
  padding: 20px;
}

.search-bar {
  padding: 8px;
  width: 100%;
  margin-bottom: 20px;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.product-card {
  background: #fff;
  padding: 20px;
  width: 240px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  border-radius: 10px;
  text-align: center;
  transition: transform 0.3s ease;
}

.image-wrapper {
  overflow: hidden;
  border-radius: 8px;
}

.product-card img {
  width: 100%;
  height: 160px;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.product-card:hover img {
  transform: scale(1.08);
}

.price {
  color: #42b983;
  font-weight: bold;
  margin: 8px 0;
}

.admin-controls {
  margin-top: 10px;
}

.edit-btn,
.delete-btn {
  margin: 5px;
  padding: 6px 12px;
  border: none;
  cursor: pointer;
  border-radius: 6px;
  font-weight: bold;
}

.edit-btn {
  background-color: #f39c12;
  color: white;
}

.delete-btn {
  background-color: #e74c3c;
  color: white;
}

.toast {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #42b983;
  color: white;
  padding: 12px 18px;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}

.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  padding: 30px;
  border-radius: 10px;
  width: 300px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.3);
}
</style>
