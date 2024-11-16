<template>
  <section class="py-16" dir="rtl">
    <h3 class="text-2xl md:text-3xl font-bold mb-8 px-8 sm:mr-10">أكثر البودكاستات شعبية لدينا حتى الآن</h3>


    <div class="relative overflow-hidden">
      <div
        class="flex gap-4 overflow-x-scroll snap-x snap-mandatory scroll-smooth slider-container"
        ref="slider"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
        @scroll="handleScroll"
      >

        <PodcastCard
          v-for="podcast in mostViewedItems"
          :key="podcast.id"
          :podcastId="podcast.id"
          v-bind="podcast"
          class="snap-center min-w-[80%] sm:min-w-[45%] lg:min-w-[30%] xl:min-w-[22%] bg-white shadow-lg rounded-lg mx-2"
        />
      </div>

      <button
        @click="scrollRight"
        class="hidden sm:block absolute left-2 top-1/2 transform -translate-y-1/2 bg-purple-600 text-white p-2 rounded-full shadow-lg hover:bg-purple-700 transition z-10"
        aria-label="Previous"
      >
        &larr;
      </button>
      <button
        @click="scrollLeft"
        class="hidden sm:block absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-600 text-white p-2 rounded-full shadow-lg hover:bg-purple-700 transition z-10"
        aria-label="Next"
      >
        &rarr;
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import axios from 'axios'
import PodcastCard from '@/components/PodcastCard.vue'
import { useItemStore } from '@/Stores/ItemStore.js'


const itemStore = useItemStore()
const {mostViewedItems, setMostViewedItems,setLoading} = itemStore


// Fetch the most-viewed podcasts on component mount
onMounted(async () => {
  setLoading(true)
  try {
    const response = await axios.get('http://localhost:8000/api/items/most-viewed')
    console.log('API Response:', response.data) // Debug log
    setMostViewedItems(response.data)
    console.log('Store after setting:', mostViewedItems.value) // Debug log
  } catch (error) {
    console.error('Error fetching most-viewed podcasts:', error)
  } finally {
    setLoading(false)
  }
})

const slider = ref(null)
const autoScrollInterval = ref(null)
const touchStartX = ref(null)
const isScrolling = ref(false)

const getScrollAmount = () => {
  if (!slider.value) return 0
  const viewportWidth = window.innerWidth
  if (viewportWidth < 640) return slider.value.clientWidth * 0.8
  if (viewportWidth < 1024) return slider.value.clientWidth * 0.45
  if (viewportWidth < 1280) return slider.value.clientWidth * 0.3
  return slider.value.clientWidth * 0.22
}

const handleScroll = () => {
  if (!slider.value || isScrolling.value) return

  const maxScroll = -(slider.value.scrollWidth - slider.value.clientWidth)
  const currentScroll = slider.value.scrollLeft

  // Check if we've reached the end (left-most position in RTL)
  if (currentScroll <= maxScroll) {
    isScrolling.value = true
    // Small delay to ensure smooth transition
    setTimeout(() => {
      slider.value.scrollTo({
        left: 0,
        behavior: 'instant'
      })
      isScrolling.value = false
    }, 100)
  }
}

const handleTouchStart = (e) => {
  touchStartX.value = e.touches[0].clientX
  stopAutoScroll()
}

const handleTouchMove = (e) => {
  if (!touchStartX.value) return
  e.preventDefault()
}

const handleTouchEnd = (e) => {
  if (!touchStartX.value) return

  const touchEndX = e.changedTouches[0].clientX
  const diff = touchStartX.value - touchEndX

  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      scrollLeft()
    } else {
      scrollRight()
    }
  }

  touchStartX.value = null
  startAutoScroll()
}

const autoScroll = () => {
  if (!slider.value) return

  const maxScroll = -(slider.value.scrollWidth - slider.value.clientWidth)
  const currentScroll = slider.value.scrollLeft

  if (currentScroll <= maxScroll) {
    // If we're at the end, reset to start
    slider.value.scrollTo({
      left: 0,
      behavior: 'instant'
    })
    // After a brief delay, continue scrolling
    setTimeout(() => {
      scrollRight()
    }, 100)
  } else {
    scrollRight()
  }
}

const scrollLeft = () => {
  if (!slider.value || isScrolling.value) return

  const currentScroll = slider.value.scrollLeft
  const maxScroll = -(slider.value.scrollWidth - slider.value.clientWidth)

  if (currentScroll + getScrollAmount() >= 0) {
    // If next scroll would go beyond the start, go to end
    slider.value.scrollTo({
      left: maxScroll,
      behavior: 'smooth'
    })
  } else {
    slider.value.scrollBy({
      left: getScrollAmount(),
      behavior: 'smooth'
    })
  }
}

const scrollRight = () => {
  if (!slider.value || isScrolling.value) return

  const currentScroll = slider.value.scrollLeft
  const maxScroll = -(slider.value.scrollWidth - slider.value.clientWidth)

  if (currentScroll - getScrollAmount() <= maxScroll) {
    // If next scroll would go beyond the end, go to start
    slider.value.scrollTo({
      left: 0,
      behavior: 'smooth'
    })
  } else {
    slider.value.scrollBy({
      left: -getScrollAmount(),
      behavior: 'smooth'
    })
  }
}

const startAutoScroll = () => {
  stopAutoScroll()
  autoScrollInterval.value = setInterval(autoScroll, 3000)
}

const stopAutoScroll = () => {
  if (autoScrollInterval.value) {
    clearInterval(autoScrollInterval.value)
    autoScrollInterval.value = null
  }
}

onMounted(() => {
  startAutoScroll()
  slider.value?.addEventListener('mouseenter', stopAutoScroll)
  slider.value?.addEventListener('mouseleave', startAutoScroll)
})

onBeforeUnmount(() => {
  stopAutoScroll()
  if (slider.value) {
    slider.value.removeEventListener('mouseenter', stopAutoScroll)
    slider.value.removeEventListener('mouseleave', startAutoScroll)
  }
})
</script>

<style scoped>
/* Hide the scrollbar */
.slider-container::-webkit-scrollbar {
  display: none;
}

.slider-container {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;     /* Firefox */
}
</style>
