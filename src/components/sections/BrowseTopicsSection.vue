<template>
  <h3 class="text-2xl md:text-3xl font-bold px-8 sm:mr-10 mb-6 md:mb-8 text-gray-800" dir="rtl">استعرض المواضيع</h3>
  <section class="py-6 px-4 md:py-10 text-center bg-transparent" dir="rtl">

    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <router-link
        v-for="topic in topics"
        :key="topic.name"
        :to="{ name: 'CategoryPage', params: { category: topic.name,
        image: topic.image } }"
        :style="{ backgroundImage: `url(${topic.image})` }"
        class="relative h-32 sm:h-40 lg:h-48 bg-cover bg-center rounded-lg shadow-lg cursor-pointer transform transition-transform hover:scale-105"
      >
        <div class="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center">
          <span class="text-white font-semibold text-lg sm:text-xl">{{ topic.name }}</span>
        </div>
      </router-link>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  topics: {
    type: Array,
    required: true
  }
})


</script>

<style scoped>
/* Grid and Card Styling */
section {
  background-color: #f9fafb;
}
</style>
