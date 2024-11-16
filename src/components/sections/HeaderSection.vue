<template>
  <header dir="rtl" class="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
    <div class="container mx-auto px-4 py-4">
      <nav class="flex justify-between items-center">
        <!-- Logo Section -->
        <div class="flex items-center">
          <router-link to="/" class="flex items-center gap-2 group">
            <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span class="text-transparent font-bold">P</span>
            </div>
            <h1 class="text-2xl font-bold bg-black bg-clip-text text-transparent
                      group-hover:from-purple-600 group-hover:to-primary transition duration-300">
              {{ title }}
            </h1>
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-8">
          <div class="flex items-center space-x-8">
            <router-link
              v-for="link in navLinks"
              :key="link.path"
              :to="link.path"
              class="text-gray-600 hover:text-primary mx-5 transition duration-300 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary hover:after:w-full after:transition-all"
            >
              {{ link.name }}
            </router-link>
          </div>

          <!-- Auth Buttons or Profile Icon -->
          <div class="flex items-center space-x-4">
            <template v-if="!isAuthenticated">
              <button
                @click="handleNavigation('/login')"
                class="text-gray-600 hover:text-primary transition duration-300 px-4 py-2 rounded-full hover:bg-gray-50"
              >
                تسجيل الدخول
              </button>
              <button
                @click="handleNavigation('/signup')"
                class="text-white bg-primary px-6 py-2 rounded-full hover:shadow-lg hover:shadow-primary/20 transition duration-300"
              >
                إنشاء حساب
              </button>
            </template>
            <template v-else>
              <button
                @click="handleNavigation('/profile')"
                class="text-gray-600 hover:text-primary transition duration-300 flex items-center gap-2 px-4 py-2 rounded-full hover:bg-gray-50"
              >
                <span class="material-icons">person</span>
                الملف الشخصي
              </button>
              <button
                @click="logout"
                class="text-red-600 hover:text-red-800 bg-red-100 px-3 py-1 rounded-full transition duration-300"
              >
                تسجيل الخروج
              </button>
            </template>
          </div>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="toggleMobileMenu"
          class="md:hidden p-2 rounded-lg hover:bg-gray-100 transition duration-300"
        >
          <div class="w-6 h-5 flex flex-col justify-between">
            <span
              v-for="i in 3"
              :key="i"
              class="w-full h-0.5 bg-gray-600 rounded-full transition duration-300"
              :class="getMobileMenuClasses(i)"
            ></span>
          </div>
        </button>
      </nav>

      <!-- Mobile Menu -->
      <div v-if="isMobileMenuOpen" class="md:hidden py-4 space-y-4">
        <router-link
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          class="block px-4 py-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition duration-300"
          @click="closeMobileMenu"
        >
          {{ link.name }}
        </router-link>

        <div class="flex flex-col gap-2 px-4 pt-4 border-t border-gray-100">
          <template v-if="!isAuthenticated">
            <button
              @click="handleNavigation('/login')"
              class="w-full text-center text-gray-600 hover:text-primary px-4 py-2 rounded-full hover:bg-gray-50 transition duration-300"
            >
              تسجيل الدخول
            </button>
            <button
              @click="handleNavigation('/signup')"
              class="w-full text-center bg-primary text-white px-6 py-2 rounded-full hover:shadow-lg hover:shadow-primary/20 transform hover:-translate-y-0.5 transition duration-300"
            >
              إنشاء حساب
            </button>
          </template>
          <template v-else>
            <button
              @click="handleNavigation('/profile')"
              class="w-full text-center text-gray-600 hover:text-primary px-4 py-2 rounded-full hover:bg-gray-50 transition duration-300 flex items-center gap-2"
            >
              <span class="material-icons">person</span> الملف الشخصي
            </button>
            <button
              @click="logout"
              class="w-full text-center text-red-600 hover:text-red-800 px-4 py-2 rounded-full bg-red-100 transition duration-300"
            >
              تسجيل الخروج
            </button>
          </template>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const route = useRoute()

const title = ref('لُب')
const isMobileMenuOpen = ref(false)
const navLinks = ref([
  { name: 'اكتشف', path: '/discover' },
  { name: 'الفئات', path: '/categories' },
  { name: 'معلومات عنا', path: '/about' },
])

// Check if the user is authenticated by looking for a token in localStorage
const isAuthenticated = computed(() => !!localStorage.getItem('authToken'))

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const handleNavigation = (path) => {
  closeMobileMenu()
  router.push(path)
}

const getMobileMenuClasses = (index) => {
  return {
    'rotate-45 translate-y-2': isMobileMenuOpen.value && index === 1,
    'opacity-0': isMobileMenuOpen.value && index === 2,
    '-rotate-45 -translate-y-2': isMobileMenuOpen.value && index === 3
  }
}

// Logout function to clear the token and redirect to login
const logout = async () => {
  try {
    await axios.post('http://localhost:8000/api/auth/logout', {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    })
    localStorage.removeItem('authToken')
    router.push('/login')
  } catch (error) {
    console.error('Logout failed:', error)
  }
}

const handleOutsideClick = (event) => {
  const header = event.target.closest('header')
  if (!header && isMobileMenuOpen.value) {
    closeMobileMenu()
  }
}

watch(() => route.path, () => {
  closeMobileMenu()
})

onMounted(() => {
  document.addEventListener('click', handleOutsideClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleOutsideClick)
})
</script>

<style scoped>
.router-link-active {
  color: #5D3FD3;
  position: relative;
}

.router-link-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #5D3FD3;
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s ease-out;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
