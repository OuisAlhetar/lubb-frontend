<template>
  <div>
    <!-- Modal -->
    <ModalComponent
      v-show="showAuthModal"
      title="تسجيل الدخول مطلوب"
      message="يجب عليك تسجيل الدخول أو إنشاء حساب للاستفادة من هذه الميزة."
      @close="showAuthModal = false"
    />
    <HeaderSection />
    <div v-if="loading" class="min-h-screen flex items-center justify-center">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
    </div>

    <div v-else-if="targetItem" class="podcast-detail-page pt-16 px-4 sm:px-6 lg:px-12 bg-gray-50 min-h-screen" dir="rtl">
      <div class="max-w-6xl mx-auto">
        <!-- Hero Section -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden">
          <div class="relative h-72 sm:h-96">
            <img
              :src="targetItem.cover_image"
              :alt="targetItem.title"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h1 class="text-3xl sm:text-4xl font-bold mb-2">{{ targetItem.title }}</h1>
              <p class="text-lg opacity-90">{{ targetItem.short_summary }}</p>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex justify-between items-center px-6 py-4 border-b">
            <div class="flex gap-4">
              <button
                @click="toggleLike"
                class="flex items-center gap-2 px-4 py-2 rounded-full transition"
                :class="isLiked ? 'bg-red-100 text-red-600' : 'bg-gray-100 hover:bg-gray-200'"
              >
                <span class="text-xl" v-html="isLiked ? '❤️' : '🤍'"></span>
                {{ isLiked ? 'إعجاب' : 'أعجبني' }}
              </button>
              <button
                @click="toggleSave"
                class="flex items-center gap-2 px-4 py-2 rounded-full transition"
                :class="isSaved ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 hover:bg-gray-200'"
              >
                <span class="text-xl" v-html="isSaved ? '📑' : '📄'"></span>
                {{ isSaved ? 'محفوظ' : 'حفظ' }}
              </button>
            </div>
            <button
              @click="goBack"
              class="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition"
            >
              العودة للقائمة
            </button>
          </div>

          <!-- Content Grid -->
          <div class="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Main Content -->
            <div class="md:col-span-2 space-y-6">
              <div class="bg-gray-50 p-6 rounded-lg">
                <h2 class="text-xl font-bold mb-4">الوصف التفصيلي</h2>
                <p class="text-gray-700 leading-relaxed">{{ targetItem.detailed_summary }}</p>
              </div>

              <div class="bg-gray-50 p-6 rounded-lg">
                <h2 class="text-xl font-bold mb-4">التصنيفات</h2>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="category in targetItem.categories"
                    :key="category"
                    class="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm"
                  >
                    {{ category }}
                  </span>
                </div>
              </div>

              <div class="bg-gray-50 p-6 rounded-lg">
                <h2 class="text-xl font-bold mb-4">العلامات</h2>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="tag in targetItem.tags"
                    :key="tag"
                    class="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Sidebar -->
            <div class="space-y-6">
              <div class="bg-gray-50 p-6 rounded-lg">
                <h2 class="text-xl font-bold mb-4">معلومات إضافية</h2>
                <div class="space-y-3">
                  <div>
                    <span class="font-semibold">المؤلف/الضيف:</span>
                    <span class="text-gray-700">{{ targetItem.author_or_guest }}</span>
                  </div>
                  <div v-if="targetItem.narrator">
                    <span class="font-semibold">الراوي:</span>
                    <span class="text-gray-700">{{ targetItem.narrator }}</span>
                  </div>
                  <div>
                    <span class="font-semibold">سنة الإصدار:</span>
                    <span class="text-gray-700">{{ targetItem.release_year }}</span>
                  </div>
                  <div>
                    <span class="font-semibold">القسم:</span>
                    <span class="text-gray-700">{{ targetItem.section }}</span>
                  </div>
                  <div>
                    <span class="font-semibold">تاريخ النشر:</span>
                    <span class="text-gray-700">{{ formatDate(targetItem.created_at) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="min-h-screen flex items-center justify-center">
      <p class="text-xl text-gray-600">لم يتم العثور على العنصر</p>
    </div>
  </div>
  <FooterSection/>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axiosInstance from '@/utils/axiosConfig.js'
import HeaderSection from '@/components/sections/HeaderSection.vue'
import FooterSection from '@/components/sections/FooterSection.vue'
import ModalComponent from '@/components/ModalComponent.vue'



const showAuthModal = ref(false)
const route = useRoute()
const router = useRouter()
const targetItem = ref(null)
const loading = ref(true)
const isLiked = ref(false)
const isSaved = ref(false)

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}


const toggleLike = async () => {
  if (!userIsAuthenticated()) {
    showAuthModal.value = true
    console.log('Modal state:', showAuthModal.value) // Debug

    return
  }

  try {
    const url = `/items/${route.params.id}/${isLiked.value ? 'unlike' : 'like'}`
    const method = isLiked.value ? 'DELETE' : 'POST'
    await axiosInstance({ method, url })
    isLiked.value = !isLiked.value
  } catch (error) {
    console.error('Error toggling like:', error)
  }
}

const toggleSave = async () => {
  if (!userIsAuthenticated()) {
    showAuthModal.value = true
    return
  }

  try {
    const url = `/items/${route.params.id}/${isSaved.value ? 'unsave' : 'save'}`
    const method = isSaved.value ? 'DELETE' : 'POST'
    await axiosInstance({ method, url })
    isSaved.value = !isSaved.value
  } catch (error) {
    console.error('Error toggling save:', error)
  }
}

const userIsAuthenticated = () => {
  // Replace with your actual logic to check authentication
  return !!localStorage.getItem('authToken')
}

// Also update the fetch operation
onMounted(async () => {
  try {
    loading.value = true
    const response = await axiosInstance.get(`/items/${route.params.id}`)
    targetItem.value = response.data

    // Fetch like and save states
    const statesResponse = await axiosInstance.get(`/items/${route.params.id}/states`)
    isLiked.value = !!statesResponse.data.liked
    isSaved.value = !!statesResponse.data.saved

  } catch (error) {
    console.error('Error fetching podcast:', error)
  } finally {
    loading.value = false
  }
})

const goBack = () => {
  router.back()
}
</script>

<style scoped>
.podcast-detail-page {
  background-color: #f3f4f6;
}
</style>