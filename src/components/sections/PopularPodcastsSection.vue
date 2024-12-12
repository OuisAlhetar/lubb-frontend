<template>
  <section class="py-16" dir="rtl">
    <h3 class="text-2xl md:text-3xl font-bold mb-8 px-8 sm:mr-10">أكثر الملخصات شعبية</h3>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center min-h-[200px]">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
    </div>

    <!-- Error State -->
    <div
      v-else-if="error"
      class="text-center text-red-600 p-8 bg-red-50 rounded-lg"
    >
      {{ error }}
      <button
        @click="fetchMostViewedItems"
        class="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
      >
        إعادة المحاولة
      </button>
    </div>

    <!-- Content -->
    <div v-else class="relative">
      <swiper
        :modules="modules"
        :slides-per-view="slidesPerView"
        :space-between="20"
        :loop="true"
        :autoplay="{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }"
        :navigation="{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }"
        :breakpoints="swiperBreakpoints"
        class="podcast-swiper"
      >
        <swiper-slide v-for="podcast in mostViewedItems" :key="podcast.id" class="h-auto">
          <div class="h-full">
            <PodcastCard
              :podcastId="podcast.id"
              v-bind="podcast"
              class="bg-white shadow-lg rounded-lg h-full flex flex-col"
            />
          </div>
        </swiper-slide>

        <!-- Navigation Buttons -->
        <div class="swiper-button-prev !text-purple-600 !hidden sm:!flex"></div>
        <div class="swiper-button-next !text-purple-600 !hidden sm:!flex"></div>
      </swiper>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import PodcastCard from '@/components/PodcastCard.vue'
import { useItemStore } from '@/Stores/ItemStore.js'
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
// Import Swiper modules
import { Navigation, Autoplay } from 'swiper/modules'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'

const itemStore = useItemStore()
const { mostViewedItems, setMostViewedItems, setLoading } = itemStore

const loading = ref(true)
const error = ref(null)
const modules = [Navigation, Autoplay]

// Responsive breakpoints for Swiper
const swiperBreakpoints = {
  320: {
    slidesPerView: 1.2,
    spaceBetween: 10
  },
  640: {
    slidesPerView: 2.2,
    spaceBetween: 15
  },
  1024: {
    slidesPerView: 3.2,
    spaceBetween: 20
  },
  1280: {
    slidesPerView: 4.2,
    spaceBetween: 20
  }
}

// Fetch the most-viewed podcasts on component mount
const fetchMostViewedItems = async () => {
  loading.value = true
  setLoading(true)
  error.value = null

  try {
    const response = await axios.get('http://localhost:8000/api/items/most-viewed')
    setMostViewedItems(response.data)
  } catch (err) {
    error.value = 'عذراً، حدث خطأ أثناء تحميل الأكثر مشاهدة. يرجى المحاولة مرة أخرى.'
    console.error('Error fetching most-viewed podcasts:', err)
  } finally {
    loading.value = false
    setLoading(false)
  }
}

onMounted(() => {
  fetchMostViewedItems()
})
</script>

<style scoped>
.podcast-swiper {
  padding: 20px 50px !important;
}

:deep(.swiper-slide) {
  height: auto !important;
  display: flex;
}

:deep(.swiper-wrapper) {
  align-items: stretch;
}

:deep(.swiper-button-prev),
:deep(.swiper-button-next) {
  width: 40px;
  height: 40px;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

:deep(.swiper-button-prev)::after,
:deep(.swiper-button-next)::after {
  font-size: 20px;
}

:deep(.swiper-button-disabled) {
  opacity: 0.5;
}

@media (max-width: 640px) {
  .podcast-swiper {
    padding: 20px 10px !important;
  }
}
</style>