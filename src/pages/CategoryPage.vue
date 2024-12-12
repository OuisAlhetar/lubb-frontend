<template>
  <HeaderSection/>
  <div class="category-page" dir="rtl">
    <!-- Hero Section -->
    <header
      class="relative h-64 sm:h-80 lg:h-96 bg-cover bg-center text-white flex items-center justify-center"
      :style="{ backgroundImage: `url(${categoryInfo.category_image})` }"
    >
      <div class="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>
      <div class="relative z-10 text-center">
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">{{ categoryInfo.name }}</h1>
        <p class="text-lg text-gray-200 max-w-2xl mx-auto px-4">
          اكتشف محتوى متميز في {{ categoryInfo.name }}
        </p>
      </div>
    </header>

    <!-- Content Section -->
    <section class="py-16 px-4 sm:px-8 lg:px-16 bg-gray-50">
      <div v-if="loading" class="flex justify-center items-center min-h-[400px]">
        <div class="loader"></div>
      </div>

      <div v-else>
        <h2 class="text-2xl md:text-3xl font-semibold text-gray-800 mb-8 text-center">
          محتوى {{ categoryInfo.name }}
        </h2>

        <div v-if="error" class="text-center text-red-600 mb-8">
          {{ error }}
          <button
            @click="fetchItems"
            class="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            إعادة المحاولة
          </button>
        </div>

        <div v-else-if="items.length === 0" class="text-center text-gray-600 mb-8">
          لا يوجد محتوى متاح حالياً
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="item in items"
            :key="item.id"
            class="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
          >
            <div class="relative h-48 overflow-hidden">
              <img
                :src="item.cover_image"
                :alt="item.title"
                class="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{{ item.title }}</h3>
              <p class="text-gray-600 mb-4 line-clamp-3">{{ item.description }}</p>

              <button
                @click="navigateToDetail(item.id)"
                class="w-full bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span>اقرأ المزيد</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  <FooterSection/>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axiosInstance from '@/utils/axiosConfig.js';
import HeaderSection from '@/components/sections/HeaderSection.vue'
import FooterSection from '@/components/sections/FooterSection.vue'

const route = useRoute()
const router = useRouter()

const categoryName = ref(route.query.name)
const categoryImage = ref(route.query.category_image)
const categoryId = ref(route.params.id)
const items = ref([])
const categoryInfo = ref([])
const loading = ref(true)
const error = ref(null)


// Fetch items from API
const fetchItems = async () => {
  try {
    loading.value = true
    error.value = null
    const response = await axiosInstance.get(`/items?category_id=${categoryId.value}`)
    const catResponse = await axiosInstance.get(`/categories/${categoryId.value}`)
    items.value = response.data.data
    categoryInfo.value = catResponse.data

  } catch (err) {
    error.value = 'حدث خطأ أثناء تحميل المحتوى. يرجى المحاولة مرة أخرى.'
    console.error('Error fetching items:', err)
  } finally {
    loading.value = false
  }
}

const navigateToDetail = (categoryId) => {
  router.push(`/podcast/${categoryId}`);
};

// Watch for route changes to refetch data
watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      categoryId.value = newId
      categoryName.value = route.params.category
      categoryImage.value = route.params.image
      fetchItems()
    }
  }
)

onMounted(() => {
  // fetchItems()
  fetchItems()
})
</script>

<style scoped>
.loader {
  width: 48px;
  height: 48px;
  border: 5px solid #e9d5ff;
  border-bottom-color: #9333ea;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Card hover effects */
.category-page .grid > div {
  backface-visibility: hidden;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #9333ea;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #7e22ce;
}
</style>