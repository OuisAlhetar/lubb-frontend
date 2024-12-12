<template>
  <HeaderSection />
  <div class="min-h-screen mt-20 bg-gradient-to-b from-gray-50 to-white" dir="rtl">
    <!-- Header Section -->
    <header class="bg-gradient-to-r from-purple-700 to-purple-500 text-white py-8">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <h1 class="text-3xl font-bold text-white drop-shadow-lg">البحث والتصفية</h1>
          <div class="w-full md:w-1/2 relative">
            <input
              type="text"
              v-model="searchQuery"
              @input="fetchItems"
              placeholder="ابحث هنا..."
              class="w-full text-lg px-6 py-3 rounded-full border-2 border-purple-300 bg-white/90
                     backdrop-blur-sm text-gray-800 placeholder-gray-400
                     focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-300
                     transition duration-300 ease-in-out"
            />
            <span class="absolute left-4 top-1/2 transform -translate-y-1/2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </header>

    <!-- Filters Section -->
    <div class="container mx-auto px-4 -mt-6">
      <div class="bg-white rounded-2xl shadow-lg p-6 backdrop-blur-sm border border-gray-100">
        <h2 class="text-2xl font-bold mb-6 text-gray-800">التصفية</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Section Filter -->
          <div class="filter-group">
            <label for="section" class="block text-gray-700 font-semibold mb-2">القسم</label>
            <select
              id="section"
              v-model="selectedSection"
              @change="fetchItems"
              class="select-input"
            >
              <option value="">كل الأقسام</option>
              <option v-for="section in sections" :key="section.id" :value="section.id">
                {{ section.name }}
              </option>
            </select>
          </div>

          <!-- Category Filter -->
          <div class="filter-group">
            <label for="category" class="block text-gray-700 font-semibold mb-2">التصنيف</label>
            <select
              id="category"
              v-model="selectedCategory"
              @change="fetchItems"
              class="select-input"
            >
              <option value="">كل التصنيفات</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>
          </div>

          <!-- Tag Filter -->
          <div class="filter-group">
            <label for="tag" class="block text-gray-700 font-semibold mb-2">العلامة</label>
            <select
              id="tag"
              v-model="selectedTag"
              @change="fetchItems"
              class="select-input"
            >
              <option value="">كل العلامات</option>
              <option v-for="tag in tags" :key="tag.id" :value="tag.id">
                {{ tag.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Items List Section -->
    <div class="container mx-auto px-4 py-8">
      <h2 class="text-2xl font-bold mb-6 text-gray-800">النتائج</h2>
      <div v-if="loading" class="flex items-center justify-center py-12">
        <div class="animate-spin rounded-full h-16 w-16 border-4 border-purple-200 border-t-purple-600"></div>
      </div>
      <div v-else-if="items.length === 0" class="text-center py-16">
        <div class="text-gray-400 text-xl">لا توجد نتائج.</div>
      </div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="item in items"
          :key="item.id"
          class="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-transform duration-300"
        >
          <div class="relative">
            <img
              :src="item.cover_image"
              :alt="item.title"
              class="h-48 w-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold mb-3 text-gray-800">{{ item.title }}</h3>
            <p class="text-gray-600 mb-4 line-clamp-2">{{ item.short_summary }}</p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                v-for="category in item.categories"
                :key="category.id"
                class="text-sm bg-purple-100 text-purple-600 px-3 py-1 rounded-full"
              >
                {{ category.name }}
              </span>
            </div>
            <button
              @click="goToItem(item.id)"
              class="w-full text-white bg-purple-600 px-6 py-3 rounded-xl font-semibold
                     hover:bg-purple-700 transform hover:-translate-y-1 transition-all duration-300
                     focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              عرض التفاصيل
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axiosInstance from '@/utils/axiosConfig.js';
import { useRouter } from 'vue-router';
import HeaderSection from '@/components/sections/HeaderSection.vue';
// import PodcastCard from '@/components/PodcastCard.vue'

const router = useRouter();
const items = ref([]);
const sections = ref([]);
const categories = ref([]);
const tags = ref([]);
const searchQuery = ref('');
const selectedSection = ref('');
const selectedCategory = ref('');
const selectedTag = ref('');
const loading = ref(false);

// Fetch Filters (Sections, Categories, Tags)
const fetchFilters = async () => {
  try {
    const [sectionsRes, categoriesRes, tagsRes] = await Promise.all([
      axiosInstance.get('/sections'),
      axiosInstance.get('/categories'),
      axiosInstance.get('/tags'),
    ]);
    sections.value = sectionsRes.data;
    categories.value = categoriesRes.data;
    tags.value = tagsRes.data;
  } catch (error) {
    console.error('Error fetching filters:', error);
  }
};

// Fetch Items with Filters
const fetchItems = async () => {
  try {
    loading.value = true;
    const response = await axiosInstance.get('/items/', {
      params: {
        search: searchQuery.value,
        section_id: selectedSection.value,
        category_id: selectedCategory.value,
        tag_id: selectedTag.value,
      },
    });
    // console.log(response.data.data)
    items.value = response.data.data;
  } catch (error) {
    console.error('Error fetching items:', error);
  } finally {
    loading.value = false;
  }
};

// Navigate to Item Details
const goToItem = (itemId) => {
  router.push(`/podcast/${itemId}`);
};

// Initialize Filters and Items
onMounted(async () => {
  await fetchFilters();
  await fetchItems();
});
</script>

<style scoped>
.container {
  max-width: 1400px;
}

.select-input {
  @apply w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-200 rounded-xl
  focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-400
  transition duration-300 ease-in-out;
}

.filter-group {
  @apply flex flex-col space-y-2;
}

/* Add smooth scrolling to the page */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c084fc;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #9333ea;
}
</style>