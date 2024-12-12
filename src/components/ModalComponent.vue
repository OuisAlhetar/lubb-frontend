<!-- Modal.vue -->
<template>
  <div v-show="show" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" dir="rtl">
    <div class="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6">
      <h2 class="text-lg font-semibold mb-4">{{ title }}</h2>
      <p class="text-gray-700 mb-6">{{ message }}</p>
      <div class="flex flex-row-reverse justify-around gap-4">
        <button
          @click="$emit('close')"
          class="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
        >
          إغلاق
        </button>
        <button
          @click="redirectToLogin"
          class="bg-purple-600 text-white text-md md:text-lg px-4 py-2 rounded hover:bg-purple-700"
        >
          تسجيل الدخول
        </button>
        <button
          @click="redirectToSignup"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          إنشاء حساب
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
defineProps({
  show: Boolean,
  title: String,
  message: String,
})
const router = useRouter()

const redirectToLogin = () => {
  router.push('/login')
}
const redirectToSignup = () => {
  router.push('/signup')
}
</script>

<style scoped>
.modal-backdrop {
  backdrop-filter: blur(5px);
}
</style>
