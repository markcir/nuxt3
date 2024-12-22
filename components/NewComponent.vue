<template>
    <div class="recent-purchases">
      <h2 class="title">Recent Purchases</h2>
      <ul class="purchase-list">
        <li
          v-for="(purchase, index) in purchases"
          :key="index"
          :class="['purchase-item', { 'new-purchase': purchase.isNew }]"
        >
          <div class="purchase-info">
            <h3 class="customer-name">{{ purchase.customer }}</h3>
            <p class="purchase-details">{{ purchase.details }}</p>
          </div>
          <div class="purchase-date">
            <span>{{ purchase.date }}</span>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const purchases = ref([
    { customer: 'Alice Johnson', details: 'Bought a Laptop', date: 'Dec 22, 2024', isNew: false },
    { customer: 'Michael Smith', details: 'Bought a Smartphone', date: 'Dec 21, 2024', isNew: false },
    { customer: 'Linda Wilson', details: 'Bought a Smartwatch', date: 'Dec 20, 2024', isNew: true },
    { customer: 'Robert Brown', details: 'Bought a Tablet', date: 'Dec 19, 2024', isNew: true },
  ]);
  
  onMounted(() => {
    setTimeout(() => {
      // Simulating new purchases
      purchases.value.unshift(
        { customer: 'Emma Davis', details: 'Bought a Camera', date: 'Dec 23, 2024', isNew: true }
      );
    }, 2000);
  });
  </script>
  
  <style scoped>
  .recent-purchases {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    max-width: 900px;
    margin: 0 auto;
  }
  
  .title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #333;
  }
  
  .purchase-list {
    list-style-type: none;
    padding: 0;
    width: 100%;
  }
  
  .purchase-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    background: white;
    border-radius: 8px;
    margin-bottom: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInSlide 0.6s ease-out forwards;
  }
  
  .new-purchase {
    background: linear-gradient(to right, #ffefba, #ffffff);
  }
  
  .purchase-info {
    flex-grow: 1;
  }
  
  .customer-name {
    font-size: 18px;
    font-weight: bold;
    margin: 0;
  }
  
  .purchase-details {
    font-size: 14px;
    color: #666;
  }
  
  .purchase-date {
    font-size: 14px;
    color: #999;
  }
  
  @keyframes fadeInSlide {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  </style>
  