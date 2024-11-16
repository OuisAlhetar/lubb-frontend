<template>
  <footer class="bg-gray-800 text-gray-300 py-10 px-4 md:px-8" dir="rtl">
    <div class="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Logo and Description -->
      <div class="flex flex-col items-center md:items-start">
        <router-link to="/" class="flex items-center gap-2 mb-4">
          <div class="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-lg">لُـ</span>
          </div>
          <span class="text-2xl font-bold text-white">لُب</span>
        </router-link>
        <p class="text-center md:text-right text-gray-400">
          منصة بودكاست مصممة لتقديم محتوى عالي الجودة للمستخدمين، تتيح لك استكشاف مواضيع مختلفة والاستمتاع بتجربة استماع رائعة.
        </p>
      </div>

      <!-- Navigation Links -->
      <div class="flex flex-col items-center md:items-start space-y-2">
        <h4 class="text-xl font-semibold text-white mb-4">روابط سريعة</h4>
        <router-link to="/discover" class="hover:text-purple-400 transition-colors">استكشاف</router-link>
        <router-link to="/categories" class="hover:text-purple-400 transition-colors">التصنيفات</router-link>
        <router-link to="/about" class="hover:text-purple-400 transition-colors">معلومات عنا</router-link>
        <router-link to="/contact" class="hover:text-purple-400 transition-colors">اتصل بنا</router-link>
      </div>

      <!-- Social Media and Contact -->
      <div class="flex flex-col items-center md:items-start space-y-4">
        <h4 class="text-xl font-semibold text-white mb-3">تواصل معنا</h4>
        <div class="flex space-x-4 rtl:space-x-reverse">
          <a href="https://facebook.com" target="_blank" class="text-gray-400 hover:text-purple-400">
            <i class="fab fa-facebook fa-lg"></i>
          </a>
          <a href="https://twitter.com" target="_blank" class="text-gray-400 hover:text-purple-400">
            <i class="fab fa-twitter fa-lg"></i>
          </a>
          <a href="https://instagram.com" target="_blank" class="text-gray-400 hover:text-purple-400">
            <i class="fab fa-instagram fa-lg"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" class="text-gray-400 hover:text-purple-400">
            <i class="fab fa-linkedin fa-lg"></i>
          </a>
        </div>
        <p class="text-gray-400 text-sm">
          بريد إلكتروني: <a href="mailto:info@podbest.com" class="hover:text-purple-400">info@podbest.com</a>
        </p>
        <p class="text-gray-400 text-sm">هاتف: +123 456 7890</p>
      </div>
    </div>

    <!-- Footer Bottom -->
    <div class="mt-8 text-center border-t border-gray-700 pt-6">
      <p class="text-gray-500 text-sm">&copy; 2024 LUB-لًب. جميع الحقوق محفوظة.</p>
    </div>
  </footer>
</template>

<script setup>
// No additional logic needed for static footer content
</script>

<style scoped>
/* Optional styling for font icons and additional adjustments */
footer i {
  transition: color 0.3s ease;
}
</style>
