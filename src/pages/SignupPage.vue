<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4" dir="rtl">
    <div class="w-full max-w-md bg-white shadow-lg rounded-lg p-6 md:p-8">
      <h2 class="text-3xl font-bold text-center text-purple-600 mb-4">إنشاء حساب جديد</h2>
      <p class="text-center text-gray-600 mb-6">انضم إلينا وابدأ رحلتك معنا!</p>

      <!-- Signup Form -->
      <form @submit.prevent="handleSignup" class="space-y-4">

        <div>
          <label class="block text-gray-700 font-semibold mb-2">اسم المستخدم</label>
          <input
            type="text"
            v-model="userName"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder="أدخل اسم المستخدم"
            required
          />
        </div>

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
          <p v-if="passwordError" class="text-red-500 text-sm mt-1">{{ passwordError }}</p>
        </div>

        <div>
          <label class="block text-gray-700 font-semibold mb-2">تأكيد كلمة المرور</label>
          <input
            type="password"
            v-model="passwordConfirmation"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder="أدخل تأكيد كلمة المرور"
            required
          />
          <p v-if="passwordMatchError" class="text-red-500 text-sm mt-1">{{ passwordMatchError }}</p>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition duration-300"
        >
          <span v-if="loading" class="loader"></span>
          <span v-else>إنشاء حساب</span>
        </button>
      </form>

      <!-- Error Message -->
      <p v-if="errorMessage" class="text-red-500 text-center mt-4">{{ errorMessage }}</p>

      <!-- Login Link -->
      <p class="text-center text-gray-600 mt-4">
        لديك حساب بالفعل؟
        <router-link to="/login" class="text-purple-600 hover:underline">تسجيل الدخول</router-link>
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
const userName = ref('')
const password = ref('')
const passwordConfirmation = ref('')
const errorMessage = ref('')
const loading = ref(false)
const passwordError = ref('')
const passwordMatchError = ref('')

const validatePassword = () => {
  if (password.value.length < 8) {
    passwordError.value = 'كلمة المرور يجب أن تكون 8 أحرف على الأقل.'
    return false
  } else {
    passwordError.value = ''
    return true
  }
}

const validatePasswordMatch = () => {
  if (password.value !== passwordConfirmation.value) {
    passwordMatchError.value = 'كلمتا المرور غير متطابقتين.'
    return false
  } else {
    passwordMatchError.value = ''
    return true
  }
}

const handleSignup = async () => {
  // Validate password and matching fields before proceeding
  if (!validatePassword() || !validatePasswordMatch()) return

  loading.value = true
  errorMessage.value = ''

  try {
    // Call the API endpoint with the signup data
    const response = await axios.post('http://127.0.0.1:8000/api/auth/register', {
      username: userName.value,
      email: email.value,
      password: password.value,
      password_confirmation: passwordConfirmation.value
    })

    // Save the token in local storage
    const token = response.data.access_token
    localStorage.setItem('authToken', token)

    // Redirect to the home page or dashboard
    router.push('/')
  } catch (error) {
    // Display error message if signup fails
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
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
