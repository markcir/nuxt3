// pages/login.vue
<script setup>
import { SESSION_STORAGE_AUTH_KEY } from "~/utils/keys.ts";
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const login = ref("");
const password = ref("");
const loading = ref(false);
const error = ref(false);
const router = useRouter();

const loginToBase64 = () => {
  const bytes = new TextEncoder().encode(`${login.value}_${password.value}`);
  const binString = String.fromCodePoint(...bytes);
  return btoa(binString);
};

const handleSubmit = async () => {
  loading.value = true;
  error.value = false;

  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = await $fetch("/api/login", {
      method: "GET",
      params: { login: login.value, password: password.value }
    });

    if (response.token === loginToBase64()) {
      sessionStorage.setItem(SESSION_STORAGE_AUTH_KEY, response.token);
      await router.push("/"); // Перенаправление на главную страницу после успешного входа
    } else {
      error.value = true;
    }
  } catch (err) {
    console.error('Login failed:', err);
    error.value = true;
  } finally {
    loading.value = false;
  }
};

definePageMeta({
  layout: "login",
});
</script>

<template>
    <form @submit.prevent="handleSubmit" class="flex justify-center items-center h-screen bg-black">
      <div class="flex flex-col items-center justify-center gap-6 w-1/3 min-w-64 text-white border-2 border-white p-8 rounded-xl shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105">
        <h2 class="text-2xl font-semibold mb-6">Welcome!</h2>
  
        <label class="input input-bordered border-transparent text-white flex items-center gap-2 w-full focus-within:border-green-500">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-5 h-5 opacity-70">
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input type="text" class="grow bg-transparent border-b-2 border-white text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition-all" placeholder="Username" v-model="login" />
        </label>
  
        <label class="input input-bordered border-transparent text-white flex items-center gap-2 w-full focus-within:border-green-500">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-5 h-5 opacity-70">
            <path fill-rule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clip-rule="evenodd" />
          </svg>
          <input type="password" class="grow bg-transparent border-b-2 border-white text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition-all" v-model="password" placeholder="●●●●●●" />
        </label>
  
        <button class="btn btn-outline btn-green-600 text-green-600 w-full py-3 rounded-md hover:bg-green-600 hover:text-white transition-all duration-200">
          <span v-if="loading" class="loading loading-spinner text-green-600"></span>
          <span v-else>Login</span>
        </button>
  
        <p v-if="error" class="text-red-500 text-sm">Incorrect login or password</p>
      </div>
    </form>
  </template>
  
  <style scoped>
  /* Custom styles for modern black-and-green theme */
  .bg-black {
    background-color: #1a1a1a;
  }
  
  input {
    transition: all 0.3s ease-in-out;
  }
  
  button {
    transition: all 0.2s ease-in-out;
  }
  </style>
  