<template>
  <Header />
  <div class="weather-container">
    <h2 class="title">Weather Forecast</h2>
    <form @submit.prevent="fetchWeather" class="weather-form">
      <input
        v-model="city"
        placeholder="Enter city name"
        class="weather-input"
      />
      <button type="submit" class="weather-btn">Get Weather</button>
    </form>

    <transition name="fade">
      <div v-if="weatherData" class="weather-info">
        <div class="weather-header">
          <h3>{{ weatherData.name }}</h3>
          <img
            :src="'https://openweathermap.org/img/wn/' + weatherData.weather[0].icon + '@2x.png'"
            alt="weather icon"
            class="weather-icon"
          />
        </div>
        <div class="weather-details">
          <p><strong>Temperature:</strong> {{ weatherData.main.temp }}°C</p>
          <p><strong>Weather:</strong> {{ weatherData.weather[0].description }}</p>
          <p><strong>Humidity:</strong> {{ weatherData.main.humidity }}%</p>
          <p><strong>Wind Speed:</strong> {{ weatherData.wind.speed }} m/s</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from "vue";

const city = ref("");
const weatherData = ref(null);

const fetchWeather = async () => {
  if (city.value.trim()) {
    try {
      const apiKey = "780733d91e0cbc72649b291521746b0e";
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();
      weatherData.value = data;
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }
};
</script>

<style scoped>
.weather-container {
  max-width: 600px;
  margin: 0 auto;
  margin-top: 30px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.title {
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
}

.weather-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  justify-content: center;
}

.weather-input {
  padding: 12px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 8px;
  flex: 1;
}

.weather-input:focus {
  border-color: #4caf50;
  outline: none;
}

.weather-btn {
  padding: 12px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.weather-btn:hover {
  background-color: #45a049;
}

.weather-info {
  background: #ffffff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.weather-header {
  display: flex;
  align-items: center;
  gap: 15px;
  justify-content: center;
  margin-bottom: 15px;
}

.weather-header h3 {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.weather-icon {
  width: 80px;
  height: 80px;
}

.weather-details p {
  font-size: 16px;
  color: #555;
  margin: 5px 0;
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
