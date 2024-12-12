<template>
  <div class="topics-section">
    <div class="container mx-auto px-4">
      <h3
        class="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-gray-800 relative"
        dir="rtl"
      >
        استعرض التصنيفات المختلفة
        <span class="block h-1 w-24 bg-purple-600 mt-2"></span>
      </h3>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center min-h-[200px]">
        <div class="loader"></div>
      </div>

      <!-- Error State -->
      <div
        v-else-if="error"
        class="text-center text-red-600 p-8 bg-red-50 rounded-lg"
      >
        {{ error }}
        <button
          @click="fetchCategories"
          class="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          إعادة المحاولة
        </button>
      </div>

      <!-- Content -->
      <section
        v-else
        class="py-4 md:py-6 text-center bg-transparent"
        dir="rtl"
      >
        <div
          class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
          :class="{ 'opacity-50': loading }"
        >
          <router-link
            v-for="category in categories"
            :key="category.id"
            :to="{
              name: 'CategoryPage',
              params: {
                id: category.id
              }
            }"
            class="category-card group relative h-28 sm:h-32 md:h-36 lg:h-40 rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <img
              :src="category.category_image"
              :alt="category.name"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent flex flex-col items-center justify-end p-2 sm:p-3">
              <span class="text-white font-bold text-sm sm:text-base md:text-lg">{{ category.name }}</span>
              <span class="text-gray-200 text-xs sm:text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                اضغط للاستعراض
              </span>
            </div>
          </router-link>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axiosInstance from '@/utils/axiosConfig.js';

const categories = ref([])
const loading = ref(true)
const error = ref(null)

const fetchCategories = async () => {
  try {
    loading.value = true
    error.value = null
    const response = await axiosInstance.get('/categories')
    categories.value = response.data
    // console.log(categories.value[0].name)
  } catch (err) {
    error.value = 'عذراً، حدث خطأ أثناء تحميل المواضيع. يرجى المحاولة مرة أخرى.'
    console.error('Error fetching categories:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchCategories()
})
</script>

<style scoped>
.topics-section {
  background: linear-gradient(to bottom, #f8fafc, #ffffff);
  padding: 1rem 0;
}

.loader {
  width: 40px;
  height: 40px;
  border: 3px solid #e2e8f0;
  border-bottom-color: #7c3aed;
  border-radius: 50%;
  display: inline-block;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg)
  }
  100% {
    transform: rotate(360deg)
  }
}

.category-card {
  isolation: isolate;
  backface-visibility: hidden;
}

.category-card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(0, 0, 0, 0.7)
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.category-card:hover::after {
  opacity: 1;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #7c3aed;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #6d28d9;
}

/* Prevent text selection */
.category-card span {
  user-select: none;
}

/* Add smooth transition for all transformations */
* {
  transition-property: transform, opacity, background-color, box-shadow;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>