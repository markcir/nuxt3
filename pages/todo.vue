<template>
  <Header />
  <div class="eventy-container">
    <h2 class="title">Eventy: Manage Your Events</h2>

    <!-- Форма добавления нового события -->
    <form @submit.prevent="addEvent" class="event-form">
      <input
        v-model="newEvent.name"
        type="text"
        placeholder="Event Name"
        required
        class="event-input"
      />
      <input
        v-model="newEvent.date"
        type="date"
        required
        class="event-input"
      />
      <textarea
        v-model="newEvent.description"
        placeholder="Event Description"
        required
        class="event-textarea"
      ></textarea>
      <button type="submit" class="event-btn">Add Event</button>
    </form>

    <!-- Список событий -->
    <div v-if="events.length > 0" class="events-list">
      <div
        v-for="(event, index) in events"
        :key="index"
        class="event-item"
        @click="showEventDetails(event)"
      >
        <div class="event-icon">
          <span>{{ getInitials(event.name) }}</span>
        </div>
        <div class="event-info">
          <h3>{{ event.name }}</h3>
          <p>{{ formatDate(event.date) }}</p>
        </div>
      </div>
    </div>

    <!-- Детали выбранного события -->
    <transition name="fade">
      <div v-if="selectedEvent" class="event-details">
        <h3>{{ selectedEvent.name }}</h3>
        <p><strong>Date:</strong> {{ formatDate(selectedEvent.date) }}</p>
        <p><strong>Description:</strong> {{ selectedEvent.description }}</p>
        <button @click="closeDetails" class="close-btn">Close</button>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from "vue";

const newEvent = ref({
  name: "",
  date: "",
  description: "",
});

const events = ref([]);
const selectedEvent = ref(null);

// Добавление нового события
const addEvent = () => {
  if (newEvent.value.name && newEvent.value.date && newEvent.value.description) {
    events.value.push({ ...newEvent.value });
    newEvent.value.name = "";
    newEvent.value.date = "";
    newEvent.value.description = "";
  }
};

// Показ деталей события
const showEventDetails = (event) => {
  selectedEvent.value = event;
};

// Закрытие деталей события
const closeDetails = () => {
  selectedEvent.value = null;
};

// Форматирование даты
const formatDate = (date) => new Date(date).toLocaleDateString();

// Получение инициалов для аватара
const getInitials = (name) => {
  const words = name.split(" ");
  return words.map((w) => w[0]).join("").toUpperCase();
};
</script>

<style scoped>
.eventy-container {
  max-width: 800px;
  margin: 10px auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
}

.event-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
}

.event-input,
.event-textarea {
  padding: 12px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 8px;
}

.event-input:focus,
.event-textarea:focus {
  border-color: #4caf50;
  outline: none;
}

.event-btn {
  padding: 12px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.event-btn:hover {
  background-color: #45a049;
}

.events-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.event-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.event-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.event-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background-color: #4caf50;
  color: white;
  font-size: 18px;
  font-weight: bold;
  border-radius: 50%;
}

.event-info h3 {
  font-size: 18px;
  margin: 0;
}

.event-info p {
  font-size: 14px;
  color: #666;
  margin: 0;
}

.event-details {
  padding: 20px;
  background-color: #e9e9e9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

.close-btn {
  margin-top: 10px;
  padding: 10px;
  background-color: #ff6347;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.close-btn:hover {
  background-color: #e55347;
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
