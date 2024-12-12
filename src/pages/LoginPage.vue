<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4" dir="rtl">
    <div class="w-full max-w-md bg-white shadow-lg rounded-lg p-6 md:p-8">
      <h2 class="text-3xl font-bold text-center text-purple-600 mb-4">تسجيل الدخول</h2>
      <p class="text-center text-gray-600 mb-6">أهلاً بعودتك! يُرجى تسجيل الدخول للمتابعة.</p>

      <!-- Login Form -->
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-gray-700 font-semibold mb-2">البريد الإلكتروني</label>
          <input
            type="email"
            v-model="email"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder="أدخل بريدك الإلكتروني"
            required
          />
        </div>
        <div>
          <label class="block text-gray-700 font-semibold mb-2">كلمة المرور</label>
          <input
            type="password"
            v-model="password"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder="أدخل كلمة المرور"
            required
          />
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition duration-300"
        >
          <span v-if="loading" class="loader"></span>
          <span v-else>تسجيل الدخول</span>
        </button>
      </form>

      <!-- Error Message -->
      <p v-if="errorMessage" class="text-red-500 text-center mt-4">{{ errorMessage }}</p>

      <button
        @click="handleGoogleLogin"
        class="w-full bg-red-500 text-white mt-4 py-3 rounded-lg font-semibold hover:bg-red-600 transition duration-300"
      >
        تسجيل الدخول باستخدام Google
      </button>

      <!-- Sign Up Link -->
      <p class="text-center text-gray-600 mt-4">
        ليس لديك حساب؟
        <router-link to="/signup" class="text-purple-600 hover:underline">أنشئ حساب جديد</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')


const handleGoogleLogin = () => {
  window.location.href = 'http://127.0.0.1:8000/auth/google';
};


const handleLogin = async () => {
  loading.value = true
  errorMessage.value = ''

  try {
    // Call the API endpoint with login data
    const response = await axios.post('http://127.0.0.1:8000/api/auth/login', {
      email: email.value,
      password: password.value,
    })

    // Save the token in local storage
    const token = response.data.token
    const username = response.data.user.name
    // console.log(username)
    localStorage.setItem('authToken', token)
    localStorage.setItem('username', username)
    // Redirect to the home page or dashboard
    router.push('/')
  } catch (error) {
    // Display error message if login fails
    if (error.response && error.response.data && error.response.data.message) {
      errorMessage.value = error.response.data.message
    } else {
      errorMessage.value = 'حدث خطأ ما، يرجى المحاولة مرة أخرى'
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
body {
  font-family: 'Roboto', sans-serif;
}
.loader {
  border: 2px solid #f3f3f3;
  border-top: 2px solid #ffffff;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
  display: inline-block;
  margin-right: 0.5rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
