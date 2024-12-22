<template>
    <div class="data-display-container">
      <h2 class="title">Statistics</h2>
      <div class="stats-card">
        <div
          class="card"
          v-for="(stat, index) in stats"
          :key="index"
          :class="['card-item', { 'card-item-appear': isLoaded }]"
        >
          <div class="card-header">
            <h3>{{ stat.title }}</h3>
          </div>
          <div class="card-body">
            <p class="value">{{ stat.valueAnimated }}</p>
            <p class="description">{{ stat.description }}</p>
          </div>
          <div class="card-footer">
            <span :style="{ color: stat.change > 0 ? 'green' : 'red' }">
              {{ stat.change > 0 ? '+' : '' }}{{ stat.change }}%
            </span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  
  const stats = [
    {
      title: 'Active Users',
      value: 1200,
      description: 'Number of active users this month',
      change: 5,
      valueAnimated: ref(0),
    },
    {
      title: 'Page Views',
      value: 5000,
      description: 'Total page views in the last 30 days',
      change: -2,
      valueAnimated: ref(0),
    },
    {
      title: 'Sales',
      value: 12000,
      description: 'Revenue from sales this month',
      change: 8,
      valueAnimated: ref(0),
    },
  ];
  
  const isLoaded = ref(false);
  
  onMounted(() => {
    setTimeout(() => {
      isLoaded.value = true;
      animateValues();
    }, 500);
  });
  
  function animateValues() {
    stats.forEach((stat) => {
      let start = 0;
      const end = stat.value;
      const duration = 2000; // Duration of animation in milliseconds
      const stepTime = 50; // Interval between updates in milliseconds
      const steps = Math.ceil(duration / stepTime);
      const increment = Math.ceil(end / steps);
  
      const interval = setInterval(() => {
        start += increment;
        if (start >= end) {
          start = end;
          clearInterval(interval);
        }
        stat.valueAnimated.value = start;
      }, stepTime);
    });
  }
  </script>
  
  <style scoped>
  .data-display-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }
  
  .title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
    color: #333;
  }
  
  .stats-card {
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    max-width: 900px;
    width: 100%;
  }
  
  .card-item {
    background: linear-gradient(to bottom, #ffffff, #f9f9f9);
    border-radius: 15px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    opacity: 0;
    transform: scale(0.9);
    animation: fadeInScale 0.6s ease-out forwards;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .card-item:hover {
    transform: scale(1);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
  
  .card-header {
    background-color: #f0f0f0;
    padding: 16px;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
  }
  
  .card-body {
    padding: 20px;
    text-align: center;
  }
  
  .value {
    font-size: 32px;
    font-weight: bold;
    margin: 10px 0;
  }
  
  .description {
    font-size: 14px;
    color: #666;
  }
  
  .card-footer {
    background-color: #f0f0f0;
    padding: 10px;
    text-align: center;
    font-size: 16px;
  }
  
  @keyframes fadeInScale {
    0% {
      opacity: 0;
      transform: scale(0.9);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
  </style>
  