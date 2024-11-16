<template>
  <section class="py-12 border-t border-gray-200">
    <div class="flex justify-between items-center opacity-50">
      <img v-for="(image, index) in partnerImages"
           :key="index"
           :src="image.src"
           :alt="image.alt"
           class="h-8">
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const partnerImages = ref([
  { src: '/images/image.png', alt: 'Spotify' },
  { src: '/images/image1.png', alt: 'Twitch' },
  { src: '/images/image2.png', alt: 'Attentive' },
  { src: '/images/image3.png', alt: 'YouTube' },
  { src: '/images/image4.png', alt: 'Podia' }
])
</script>