<template>
  <HeaderSection />

  <div class="p-6">
    <!-- Hero Section -->
    <section class="flex items-start md:items-center  justify-evenly py-16" dir="rtl">
      <!-- Text Content -->
      <div class="w-1/2 mr-2 md:mr-6">
        <h2 class="text-4xl font-bold leading-tight mt-1 sm:mt-3 mb-6">
          لُب يسهل حياتك ويجعلها أفضل
        </h2>
        <p class="text-gray-600 mb-8">
          يقدم اختيار الربيع خدمات محتوى عالية الجودة من خلال نهج يركز على الجمهور. نحن نؤمن برضا الجميع.
        </p>
        <button class="bg-[#5D3FD3] text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition duration-300">
          ابدأ الآن
        </button>
      </div>

      <div class="w-1/2">
        <ImageSlider
          class="lg:mt-4"
        />
      </div>
    </section>

    <!-- Partners Section -->
<!--    <PartnersSection />-->

    <!-- Popular Podcasts Section -->
    <PopularPodcastsSection />

    <!-- Browse Topics Section -->
    <BrowseTopicsSection :topics="topics" />
  </div>

  <FooterSection />
</template>

<script setup>
import { ref } from 'vue'
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import PopularPodcastsSection from '@/components/sections/PopularPodcastsSection.vue'
import BrowseTopicsSection from '@/components/sections/BrowseTopicsSection.vue'
import HeaderSection from '@/components/sections/HeaderSection.vue'
import FooterSection from '@/components/sections/FooterSection.vue'
import ImageSlider from '@/components/ImageSlider.vue'
//
// const popularPodcasts = ref([
//   { id: 1, title: 'رياضة NBA', description: 'الرياضة تجمع المجتمع وتعزز العلاقات.', image: 'src/assets/images/img_11.png' },
//   { id: 2, title: 'النجاح في الأعمال', description: 'تعرف على قصص نجاح الأعمال.', image: 'src/assets/images/img_12.png' },
//   { id: 3, title: 'نمِّ نفسك', description: 'نصائح حول التطوير الشخصي والنمو.', image: 'src/assets/images/img_3.png' },
//   { id: 4, title: 'رياضة NBA', description: 'الرياضة تجمع المجتمع وتعزز العلاقات.', image: 'src/assets/images/img_19.png' },
//   { id: 5, title: 'النجاح في الأعمال', description: 'تعرف على قصص نجاح الأعمال.', image: 'src/assets/images/img_1.png' },
//   { id: 6, title: 'نمِّ نفسك', description: 'نصائح حول التطوير الشخصي والنمو.', image: 'src/assets/images/img_2.png' },
// ])

const topics = ref([
      { name: 'أعمال', image: 'src/assets/images/cat_business.png' },
      { name: 'تقنية', image: 'src/assets/images/cat_technology.png' },
      { name: 'رياضة', image: 'src/assets/images/cat_sport.png' },
      { name: 'صحة', image: 'src/assets/images/cat_healthy.png' }
    ]
  )


const router = useRouter();

onMounted(() => {
  // Extract query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  const username = urlParams.get('username');

  if (token && username) {
    // Store in localStorage
    localStorage.setItem('authToken', token);
    localStorage.setItem('username', username);

    // Redirect to home page
    router.push('/');
  }
});

</script>

<style scoped>
/* Optional: Customize the slider and remove scrollbar */
.overflow-hidden {
  overflow: hidden;
}
</style>
