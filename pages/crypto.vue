<template>
    <Header />
    <div class="crypto-container">
      <h2 class="title">Cryptocurrency List</h2>
      <form @submit.prevent class="crypto-form">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search for a cryptocurrency"
          class="search-input"
        />
      </form>
  
      <transition name="fade">
        <div v-if="filteredCryptos.length > 0" class="crypto-list">
          <div
            v-for="crypto in filteredCryptos"
            :key="crypto.id"
            class="crypto-item"
            @click="selectCrypto(crypto)"
          >
            <span class="crypto-name">{{ crypto.name }}</span>
            <span class="crypto-symbol">{{ crypto.symbol.toUpperCase() }}</span>
          </div>
        </div>
        <div v-else>
          <p>No cryptocurrencies found</p>
        </div>
      </transition>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed, watch } from 'vue';
  
  const cryptos = ref([]);
  const searchQuery = ref('');
  const selectedCrypto = ref(null);
  const priceChartData = ref(null);
  const chartCanvas = ref(null);
  
  // Функция для получения списка криптовалют
  const fetchCryptos = async () => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1');
      const data = await response.json();
      cryptos.value = data;
    } catch (error) {
      console.error('Error fetching crypto data:', error);
    }
  };
  
  
  const fetchCryptoDetails = async (id) => {
    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
      const data = await response.json();
      selectedCrypto.value = {
        name: data.name,
        symbol: data.symbol,
        current_price: data.market_data.current_price.usd,
        price_change_percentage_24h: data.market_data.price_change_percentage_24h,
        market_cap: data.market_data.market_cap.usd,
      };
  
      
      const historyResponse = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=30`);
      const historyData = await historyResponse.json();
  
      
      const labels = historyData.prices.map((price) => new Date(price[0]).toLocaleDateString());
      const priceData = historyData.prices.map((price) => price[1]);
  
      priceChartData.value = {
        labels,
        priceData,
      };
    } catch (error) {
      console.error('Error fetching crypto details:', error);
    }
  };
  
  
  const drawChart = () => {
    if (!priceChartData.value || !chartCanvas.value) return;
  
    const ctx = chartCanvas.value.getContext('2d');
    const { labels, priceData } = priceChartData.value;
  
    
    ctx.clearRect(0, 0, chartCanvas.value.width, chartCanvas.value.height);
  
    
    ctx.beginPath();
    ctx.moveTo(0, chartCanvas.value.height - priceData[0] * 0.0005); 
    
    priceData.forEach((point, index) => {
      const x = (chartCanvas.value.width / (priceData.length - 1)) * index;
      const y = chartCanvas.value.height - point * 0.0005; 
      ctx.lineTo(x, y);
    });
  
    
    ctx.strokeStyle = '#4bc0c0';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
  
    // Рисуем ось X
    ctx.beginPath();
    ctx.moveTo(0, chartCanvas.value.height);
    ctx.lineTo(chartCanvas.value.width, chartCanvas.value.height);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.closePath();
  };
  
  
  const filteredCryptos = computed(() => {
    return cryptos.value.filter((crypto) => {
      return crypto.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    });
  });
  
  // Выбор криптовалюты для отображения
  const selectCrypto = (crypto) => {
    fetchCryptoDetails(crypto.id);
  };
  
  // Загружаем данные при монтировании компонента
  onMounted(() => {
    fetchCryptos();
  });
  
  // Когда данные графика обновляются, рисуем график
  watch(priceChartData, drawChart);
  </script>
  
  
<style scoped>
.crypto-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
}

.crypto-form {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
}

.crypto-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.crypto-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.crypto-item:hover {
  background-color: #f4f4f4;
}

.crypto-details {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.crypto-details h3 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
}

.crypto-details p {
  font-size: 16px;
  margin: 5px 0;
}

.positive {
  color: #4caf50;
}

.negative {
  color: #f44336;
}

.crypto-chart {
  margin-top: 20px;
  width: 100%;
  height: auto;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>