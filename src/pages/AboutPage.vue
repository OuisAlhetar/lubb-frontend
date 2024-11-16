<template>
  <header-section/>
  <div class="about-page py-12 px-4 sm:px-8 lg:px-16" dir="rtl">
    <!-- Hero Section -->
    <section class="hero-section relative flex flex-col items-center justify-center text-center py-20 mb-12">
      <div class="absolute inset-0 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 opacity-90"></div>
      <h1 class="relative text-4xl md:text-5xl font-extrabold text-white mb-4 z-10">من نحن</h1>
      <p class="relative text-white text-lg max-w-2xl mx-auto z-10">
        منصة لب هي منصة عربية تجمع العديد من الملخصات الصوتية وملخصات الكتب وملخصات البودكاست، لتكون وجهتك المفضلة في استكشاف المعرفة بشكل سريع وفعّال.
      </p>
    </section>

    <!-- Mission Section -->
    <section class="mission-section my-12 text-center">
      <h2 class="text-3xl font-semibold text-gray-800 mb-6">رسالتنا</h2>
      <p class="text-gray-600 text-lg max-w-2xl mx-auto mb-10">
        نحن نؤمن بأهمية الوقت ونسعى إلى توفير محتوى معرفي مختصر وذي قيمة عالية. رسالتنا هي تسهيل وصول الجمهور العربي إلى مصادر متعددة من المعرفة بشكل سلس وملهم.
      </p>
      <div class="mission-icons grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <div class="flex flex-col items-center">
          <div class="icon bg-purple-600 p-6 rounded-full text-white text-3xl mb-4">📘</div>
          <p class="text-gray-700">تقديم محتوى شامل وغني</p>
        </div>
        <div class="flex flex-col items-center">
          <div class="icon bg-purple-600 p-6 rounded-full text-white text-3xl mb-4">🎧</div>
          <p class="text-gray-700">ملخصات صوتية مميزة</p>
        </div>
        <div class="flex flex-col items-center">
          <div class="icon bg-purple-600 p-6 rounded-full text-white text-3xl mb-4">📱</div>
          <p class="text-gray-700">سهولة الوصول من أي جهاز</p>
        </div>
      </div>
    </section>

    <!-- Vision Section -->
    <section class="vision-section my-12 py-12 px-4 rounded-lg text-center bg-gradient-to-r from-purple-50 to-purple-100">
      <h2 class="text-3xl font-semibold text-purple-700 mb-6">رؤيتنا</h2>
      <p class="text-gray-600 text-lg max-w-2xl mx-auto">
        أن تكون منصة لب الخيار الأول لكل شخص يرغب في اكتساب المعرفة بطريقة مختصرة وسهلة. نطمح إلى بناء مجتمع واعٍ يسعى للمعرفة من خلال محتوى مبتكر وحديث.
      </p>
    </section>

    <!-- Values Section -->
    <section class="values-section my-12">
      <h2 class="text-3xl font-semibold text-gray-800 mb-8 text-center">قيمنا</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
        <div class="value-card p-8 bg-white shadow-md rounded-lg transition transform hover:scale-105">
          <h3 class="text-xl font-semibold text-purple-600 mb-4">الجودة</h3>
          <p class="text-gray-600">نلتزم بتقديم محتوى عالي الجودة يلبي تطلعات جمهورنا ويوفر لهم تجارب معرفية مميزة.</p>
        </div>
        <div class="value-card p-8 bg-white shadow-md rounded-lg transition transform hover:scale-105">
          <h3 class="text-xl font-semibold text-purple-600 mb-4">الابتكار</h3>
          <p class="text-gray-600">نستخدم أحدث الوسائل التقنية لتقديم تجربة مستخدم سلسة وجذابة ومواكبة للتطورات.</p>
        </div>
        <div class="value-card p-8 bg-white shadow-md rounded-lg transition transform hover:scale-105">
          <h3 class="text-xl font-semibold text-purple-600 mb-4">المرونة</h3>
          <p class="text-gray-600">نؤمن بأهمية التنوع في أساليب التعلم ونقدم محتوى يناسب احتياجات مختلف الفئات.</p>
        </div>
      </div>
    </section>

    <!-- Call to Action Section -->
    <section class="call-to-action my-12 text-center py-12 bg-purple-50 rounded-lg">
      <h2 class="text-3xl font-semibold text-purple-700 mb-6">انضم إلينا الآن</h2>
      <p class="text-gray-600 max-w-2xl mx-auto mb-8">
        سواء كنت شغوفًا بالتعلم أو ترغب في مشاركة محتواك، منصة لب ترحب بك! انضم إلينا لتكون جزءًا من هذا المجتمع المعرفي المتنامي.
      </p>
      <button class="bg-purple-600 text-white px-8 py-3 rounded-full hover:bg-purple-700 transition duration-200 text-lg font-semibold">
        اكتشف المزيد
      </button>
    </section>
  </div>
  <footer-section/>
</template>

<script setup>
// This is a simple static page, so no additional script is needed here
import FooterSection from '@/components/sections/FooterSection.vue'
import HeaderSection from '@/components/sections/HeaderSection.vue'
</script>

<style scoped>
.about-page h1, .about-page h2, .about-page h3 {
  font-weight: bold;
}

.hero-section {
  position: relative;
  background-image: url('/images/about-hero-bg.jpg');
  background-size: cover;
  background-position: center;
  height: 60vh;
}

.mission-section .mission-icons .icon {
  font-size: 2.5rem;
}

.values-section .value-card {
  transition: transform 0.2s ease-in-out;
}

.call-to-action {
  background-color: #f9f5ff;
}
</style>
