<template>
  <div class="bg-[#5D3FD3]/10 rounded-full md:w-96 md:h-96 w-60 h-60 overflow-hidden relative">
    <!-- Slider Container -->
    <Swiper
      :modules="modules"
      :slides-per-view="1"
      :space-between="30"
      :loop="true"
      :autoplay="{
        delay: 3000,
        disableOnInteraction: false
      }"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <SwiperSlide v-for="(image, index) in images" :key="index">
        <img
          :src="image"
          alt="podcast"
          class="md:w-96 md:h-96 w-60 h-60 object-cover rounded-full"
        />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import required modules
import { Autoplay } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'

const modules = [Autoplay]

const images = [
  'src/assets/images/img.png',
  'src/assets/images/img_9.png',
  'src/assets/images/img_16.png',
  'src/assets/images/img_11.png',
  'src/assets/images/img_12.png',
  'src/assets/images/img_18.png',
]

const currentIndex = ref(0)
const swiper = ref(null)

const onSwiper = (swiperInstance) => {
  swiper.value = swiperInstance
}

const onSlideChange = () => {
  if (swiper.value) {
    currentIndex.value = swiper.value.realIndex
  }
}
</script>

<style scoped>
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
}

:deep(.swiper-wrapper) {
  align-items: center;
}
</style>