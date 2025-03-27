<template>
  <div class="home">
  <!-- HERO SECTION -->
  <section class="hero">
  <div class="hero-wrapper">
  <div class="hero-left">
  <h1>Elevate Your Wardrobe</h1>
  <p>Where fashion meets function — shop timeless pieces built to last.</p>
  <router-link to="/products" class="cta-btn">Explore Now</router-link>
  </div>
  <div class="hero-right">
  <img src="../assets/logo.png" alt="Fashion" />
  </div>
  </div>
  </section>
   
      <!-- FEATURED SECTION -->
  <section class="featured">
  <h2>Featured Products</h2>
  <div class="product-showcase">
  <div v-for="item in featuredItems" :key="item.id" class="product-item">
  <img :src="item.image" :alt="item.name" />
  <div class="info">
  <h3>{{ item.name }}</h3>
  <p class="price">€{{ item.price }}</p>
  <router-link to="/products" class="product-link">View Product</router-link>
  </div>
  </div>
  </div>
  </section>
   
      <!-- WHY SHOP -->
  <section class="why">
  <div class="why-item">
  <img src="https://cdn-icons-png.flaticon.com/512/190/190411.png" alt="Quality" width="60" />
  <h4>Quality Guaranteed</h4>
  <p>Crafted with care from premium materials.</p>
  </div>
  <div class="why-item">
  <img src="https://cdn-icons-png.flaticon.com/512/633/633611.png" alt="Delivery" width="60" />
  <h4>Fast Delivery</h4>
  <p>Receive your order in 2–3 working days.</p>
  </div>
  <div class="why-item">
  <img src="https://cdn-icons-png.flaticon.com/512/747/747376.png" alt="Secure" width="60" />
  <h4>Secure Checkout</h4>
  <p>Safe and easy payment methods available.</p>
  </div>
  </section>
   
      <!-- CTA BANNER (Only if not logged in) -->
  <section class="cta-banner" v-if="!isLoggedIn">
  <h2>Be Part of the Style Revolution</h2>
  <router-link to="/register" class="cta-btn">Create Account</router-link>
  </section>
   
      <!-- FOOTER -->
  <footer class="footer">
  <p>&copy; 2025 FStyle | Created by <strong>Firas Mezghani</strong></p>
  </footer>
  </div>
  </template>
   
  <script>
  
  export default {
  
    name: 'HomePage',
  
    data() {
  
      return {
  
        isLoggedIn: !!localStorage.getItem('token'),
  
        featuredItems: [
  
          {
  
            id: 1,
  
            name: "Essential Hoodie",
  
            price: 59.99,
  
            image: "http://localhost:5050/assets/essential-hoodie.png",
  
          },
  
          {
  
            id: 2,
  
            name: "Basic Tee",
  
            price: 24.99,
  
            image: "http://localhost:5050/assets/relaxed-fit-tee.png",
  
          },
  
          {
  
            id: 3,
  
            name: "Urban Jacket",
  
            price: 84.99,
  
            image: "http://localhost:5050/assets/urban-jacket.png",
  
          }
  
        ]
  
      };
  
    },
  
    watch: {
  
      $route() {
  
        this.isLoggedIn = !!localStorage.getItem('token');
  
      }
  
    }
  
  };
  </script>
   
  <style scoped>
  
  .home {
  
    font-family: 'Poppins', sans-serif;
  
    background-color: #f8f9fa;
  
    color: #2c3e50;
  
  }
  
  .hero {
  
    background-color: #ffffff;
  
    padding: 60px 20px;
  
  }
  
  .hero-wrapper {
  
    display: flex;
  
    flex-wrap: wrap;
  
    max-width: 1200px;
  
    margin: 0 auto;
  
    gap: 40px;
  
    align-items: center;
  
    justify-content: space-between;
  
  }
  
  .hero-left {
  
    flex: 1 1 450px;
  
  }
  
  .hero-left h1 {
  
    font-size: 3rem;
  
    margin-bottom: 20px;
  
  }
  
  .hero-left p {
  
    font-size: 1.1rem;
  
    margin-bottom: 30px;
  
    color: #555;
  
  }
  
  .hero-right img {
  
    max-width: 500px;
  
    border-radius: 12px;
  
  }
  
  .cta-btn {
  
    background-color: #42b983;
  
    color: white;
  
    padding: 12px 26px;
  
    border-radius: 6px;
  
    text-decoration: none;
  
    font-weight: 600;
  
  }
  
  .cta-btn:hover {
  
    background-color: #369a6f;
  
  }
  
  .featured {
  
    padding: 60px 20px;
  
    text-align: center;
  
    background-color: #ffffff;
  
  }
  
  .featured h2 {
  
    font-size: 2rem;
  
    margin-bottom: 40px;
  
  }
  
  .product-showcase {
  
    display: flex;
  
    flex-wrap: wrap;
  
    justify-content: center;
  
    gap: 30px;
  
  }
  
  .product-item {
  
    width: 260px;
  
    background-color: #fff;
  
    padding: 18px;
  
    border-radius: 12px;
  
    box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  
    text-align: center;
  
  }
  
  .product-item img {
  width: 100%;
  height: 140px;
  object-fit: contain;
  margin-bottom: 10px;
  border-radius: 8px;
}
  
  .product-item h3 {
  
    font-size: 1.1rem;
  
    margin-bottom: 5px;
  
  }
  
  .price {
  
    color: #42b983;
  
    font-weight: 600;
  
    margin-bottom: 10px;
  
  }
  
  .product-link {
  
    color: #2c3e50;
  
    text-decoration: underline;
  
    font-weight: 500;
  
  }
  
  .why {
  
    background-color: #f1f3f5;
  
    padding: 60px 20px;
  
    display: flex;
  
    flex-wrap: wrap;
  
    justify-content: center;
  
    gap: 30px;
  
    text-align: center;
  
  }
  
  .why-item {
  
    background: white;
  
    padding: 20px;
  
    border-radius: 10px;
  
    width: 260px;
  
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  
  }
  
  .why-item h4 {
  
    margin-top: 10px;
  
    margin-bottom: 10px;
  
  }
  
  .cta-banner {
  
    background-color: #2c3e50;
  
    color: white;
  
    text-align: center;
  
    padding: 60px 20px;
  
  }
  
  .footer {
  
    background-color: #1b1b1b;
  
    color: #bbb;
  
    text-align: center;
  
    padding: 20px;
  
    font-size: 0.9rem;
  
  }
  </style>
  
   