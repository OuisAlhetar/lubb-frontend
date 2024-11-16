<template>
  <HeaderSection/>
  <div class="category-page" dir="rtl">
    <!-- Hero Section -->
    <header
      class="relative h-64 sm:h-80 lg:h-96 bg-cover bg-center text-white flex items-center justify-center"
      v-bind:style="{ backgroundImage: `url(/${categoryImage})`}"
    >
      <!--      <img src="src/assets/images/image.png" alt="">-->
      <div class="absolute inset-0 bg-black bg-opacity-50"></div>
      <h1 class="relative text-3xl sm:text-4xl lg:text-5xl font-bold z-10">{{ categoryName }}</h1>
    </header>

    <!-- Content Section -->
    <section class="py-12 px-4 sm:px-8 lg:px-16">
      <h2 class="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 text-center">
        محتوى عن "{{ categoryName }}"
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="item in categoryContent"
          :key="item.id"
          class="bg-white shadow-md rounded-lg overflow-hidden transform transition hover:scale-105"
        >
          <img :src="'/'+item.image" alt="item.title" class="h-40 w-full object-cover" />
          <div class="p-4 flex flex-col">
            <h3 class="text-lg font-semibold text-gray-900">{{ item.title }}</h3>
            <p class="text-gray-600 text-sm mt-2">{{ item.description }}</p>
            <button
              @click="navigateToDetail(item.id,item.title,item.image,item.description,item.image)"
              class="mt-4 w-1/3 float-right self-end bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition duration-200"
            >
              اقرأ المزيد
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
  <FooterSection/>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import HeaderSection from '@/components/sections/HeaderSection.vue'
import FooterSection from '@/components/sections/FooterSection.vue'

const route = useRoute()
const router = useRouter()

// Fetch category details from route params or API
const categoryName = computed(() => route.params.category)
const categoryImage = computed(() => route.params.image)



const categoryContent = [
  {
    id: 1,
    title: 'مقال عن نجاح الأعمال',
    description: 'كيفية الوصول إلى النجاح في مجال الأعمال والتعلم من الخبرات.',
    image: 'src/assets/images/img_13.png'
  },
  {
    id: 2,
    title: 'التكنولوجيا والابتكار',
    description: 'التكنولوجيا تدفع المجتمع إلى الأمام من خلال الابتكار والتطور.',
    image: 'src/assets/images/img_15.png'

  },
  {
    id: 3,
    title: 'النمو الشخصي وتطوير الذات',
    description: 'خطوات نحو النمو الشخصي وكيفية تحقيق الأهداف.',
    image: 'src/assets/images/img_4.png'

  },
  {
    id: 3,
    title: 'النمو الشخصي وتطوير الذات',
    description: 'خطوات نحو النمو الشخصي وكيفية تحقيق الأهداف.',
    image: 'src/assets/images/img_6.png'

  }
  // Add more items as needed
]

// Navigation to detailed content page
const navigateToDetail = (id,title,image,description) => {
  router.push({
    name: 'PodcastDetail',
    params: { id } ,
    query: { title, description, image }
  })
}
</script>

<style scoped>
.category-page header {
  background-size: cover;
  background-position: center;
  height: 50vh;
}
.category-page .grid {
  display: grid;
  gap: 1.5rem;
}
</style>
