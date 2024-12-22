<template>
    <div class="income-chart">
      <h2 class="title">Income for the Last 6 Months</h2>
      <svg viewBox="0 0 600 300" class="chart">
        
        <line x1="50" y1="250" x2="550" y2="250" class="axis"></line>
        <line x1="50" y1="250" x2="50" y2="50" class="axis"></line>
  
        
        <text v-for="(month, index) in months" :key="index" :x="getX(index)" y="270" class="label">
          {{ month }}
        </text>
  
        
        <path :d="linePath" class="line" />
  
        
        <g v-for="(point, index) in dataPoints" :key="index">
          <circle
            :cx="getX(index)"
            :cy="getY(point)"
            r="5"
            class="point"
          />
          
          <text
            :x="getX(index)"
            :y="getY(point) - 10"
            class="value"
            text-anchor="middle"
          >
            ${{ point }}
          </text>
        </g>
      </svg>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  
  
  const dataPoints = ref([3000, 4500, 5200, 4900, 6000, 7000]); 
  const months = ref(["July", "August", "September", "October", "November", "December"]);
  
  
  const linePath = ref("");
  
  
  const getX = (index) => 50 + (500 / (dataPoints.value.length - 1)) * index;
  
  
  const getY = (value) => 250 - ((value - 2000) / 6000) * 200;
  
  
  const generateLinePath = () => {
    return dataPoints.value
      .map((point, index) =>
        index === 0 ? `M${getX(index)},${getY(point)}` : `L${getX(index)},${getY(point)}`
      )
      .join(" ");
  };
  
  onMounted(() => {
    const path = generateLinePath();
    let currentLength = 0;
    const totalLength = path.length;
  
    const animate = () => {
      linePath.value = path.substring(0, currentLength);
      currentLength += 5; 
      if (currentLength <= totalLength) {
        requestAnimationFrame(animate);
      }
    };
  
    animate();
  });
  </script>
  
  <style scoped>
  .income-chart {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    max-width: 900px;
    margin: 20px auto;
  }
  
  .title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #333;
  }
  
  .chart {
    width: 100%;
    height: 300px;
  }
  
  .axis {
    stroke: #ccc;
    stroke-width: 2;
  }
  
  .label {
    font-size: 12px;
    fill: #666;
    text-anchor: middle;
  }
  
  .line {
    fill: none;
    stroke: #4caf50;
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 600;
    animation: drawLine 2s linear forwards;
  }
  
  .point {
    fill: #4caf50;
    stroke: #fff;
    stroke-width: 2;
    transition: transform 0.3s;
  }
  
  .point:hover {
    transform: scale(1.2);
  }
  
  .value {
    font-size: 12px;
    fill: #333;
    font-weight: bold;
  }
  
  @keyframes drawLine {
    from {
      stroke-dashoffset: 600;
    }
    to {
      stroke-dashoffset: 0;
    }
  }
  </style>
  