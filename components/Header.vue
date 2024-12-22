<template>
    
    <header class="bg-gray-800 p-4 shadow-md">
      <div class="container mx-auto flex justify-between items-center">
        <div>
          <NuxtLink to="/" class="text-white text-3xl font-bold hover:text-gray-300 transition duration-200">iRecom</NuxtLink>
        </div>
        
        <!-- Центрированное меню с часами -->
        <div class="flex-grow flex justify-center items-center">
          <p class="text-white text-xl" v-if="time">{{ time }}</p>
        </div>
  
        <nav>
          <ul class="flex space-x-8">
            <li>
              <NuxtLink
                to="/"
                class="text-gray-200 hover:text-gray-300 transition duration-200"
              >Home</NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/todo"
                class="text-gray-200 hover:text-gray-300 transition duration-200"
              >Tasks</NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/weather"
                class="text-gray-200 hover:text-gray-300 transition duration-200"
              >Weather</NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/crypto"
                class="text-gray-200 hover:text-gray-300 transition duration-200"
              >CryptoSearch</NuxtLink>
            </li>
            <li>
              <button
                @click="handleLogout"
                class="text-gray-200 hover:text-gray-300 transition duration-200 focus:outline-none"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const time = ref('');
  
  // Функция для обновления времени каждую секунду
  const updateTime = () => {
    const currentTime = new Date();
    time.value = currentTime.toLocaleTimeString();
  };
  
  // Обновление времени каждую секунду
  onMounted(() => {
    setInterval(updateTime, 1000);
    updateTime(); // Обновить сразу при монтировании
  });
  
  const handleLogout = () => {
    // Логика для выхода (например, удаление данных о пользователе)
    console.log('User logged out');
    router.push('/login'); // Перенаправление на страницу входа
  };
  </script>
  
  <style scoped>
  .header {
    max-width: 100%;
  }
  
  .nav {
    display: flex;
    gap: 20px;
  }
  
  .time {
    font-size: 1.2em;
    font-weight: bold;
    color: white;
    margin: 0;
  }
  
  .flex-grow {
    flex-grow: 1;
  }
  
  .flex.justify-center.items-center {
    justify-content: center;
    align-items: center;
  }
  
  .text-xl {
    font-size: 1.25rem;
  }
  </style>
  