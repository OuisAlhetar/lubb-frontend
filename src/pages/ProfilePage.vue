<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-10" dir="rtl">
    <HeaderSection/>
    <div class="container mx-auto px-4 max-w-6xl">
      <!-- User Info Section -->
      <div class="bg-white backdrop-blur-lg bg-opacity-90 shadow-xl rounded-2xl p-8 mt-10 transform transition-all duration-300 hover:shadow-2xl">
        <div class="flex items-center mb-6">
          <div class="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {{ user.name ? user.name[0].toUpperCase() : 'U' }}
          </div>
          <h2 class="text-2xl font-bold mr-4 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            معلومات المستخدم
          </h2>
        </div>

        <div v-if="editing" class="transition-all duration-300 ease-in-out">
          <form @submit.prevent="updateProfile" class="space-y-6">
            <div class="group">
              <label class="block text-gray-600 font-semibold mb-2 transition-colors group-hover:text-purple-600">
                اسم المستخدم
              </label>
              <input
                type="text"
                v-model="user.name"
                class="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              />
            </div>
            <div class="group">
              <label class="block text-gray-600 font-semibold mb-2 transition-colors group-hover:text-purple-600">
                البريد الإلكتروني
              </label>
              <input
                type="text"
                v-model="user.email"
                class="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              />
            </div>
            <div class="group">
              <label class="block text-gray-600 font-semibold mb-2 transition-colors group-hover:text-purple-600">
               كلمة المرور
              </label>
              <input
                type="text"
                v-model="user.password"
                class="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              />
            </div>
            <div class="group">
              <label class="block text-gray-600 font-semibold mb-2 transition-colors group-hover:text-purple-600">
               تأكيد كلمة المرور
              </label>
              <input
                type="text"
                v-model="user.password_confirmation"
                class="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              />
            </div>

            <!-- Similar styling for other form fields -->
            <div class="flex space-x-4 space-x-reverse mt-6">
              <button
                type="submit"
                class="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
              >
                تحديث
              </button>
              <button
                type="button"
                @click="toggleEdit"
                class="flex-1 border-2 border-gray-300 text-gray-600 px-6 py-3 rounded-xl hover:bg-gray-50 transition-all duration-300"
              >
                إلغاء
              </button>
            </div>
          </form>
        </div>

        <div v-else class="flex flex-col space-y-4">
          <div class="flex items-center space-x-4 space-x-reverse p-4 rounded-lg bg-purple-50 transition-all duration-300 hover:bg-purple-100">
            <span class="font-semibold text-purple-600">الاسم:</span>
            <span>{{ user.name }}</span>
          </div>
          <div class="flex items-center space-x-4 space-x-reverse p-4 rounded-lg bg-purple-50 transition-all duration-300 hover:bg-purple-100">
            <span class="font-semibold text-purple-600">البريد الإلكتروني:</span>
            <span>{{ user.email }}</span>
          </div>
          <button
            @click="toggleEdit"
            class="self-end mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
          >
            تعديل المعلومات
          </button>
        </div>
      </div>

      <!-- Liked Items Sections -->
      <div class="grid md:grid-cols-2 gap-6 my-8">
        <div class="bg-white backdrop-blur-lg bg-opacity-90 shadow-xl rounded-2xl p-8 transform transition-all duration-300 hover:shadow-2xl">
          <h2 class="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            العناصر المفضلة
          </h2>
          <div v-if="likedItems.length === 0" class="text-gray-500 text-center py-8">
            <i class="fas fa-heart text-4xl mb-4 text-purple-300"></i>
            <p>لا توجد عناصر مفضلة.</p>
          </div>
          <div v-else class="space-y-4">
            <div
              v-for="item in likedItems"
              :key="item.id"
              class="group bg-purple-50 rounded-xl p-4 transition-all duration-300 hover:bg-purple-100"
            >
              <div class="flex items-center space-x-4 space-x-reverse">
                <img
                  :src="item.cover_image"
                  :alt="item.title"
                  class="h-20 w-20 object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105"
                />
                <div class="flex-1">
                  <h3 class="font-semibold text-lg text-gray-800">{{ item.title }}</h3>
                  <p class="text-sm text-gray-600 mt-1">{{ item.short_summary }}</p>
                </div>
                <button
                  @click="unlikeItem(item.id)"
                  class="text-red-500 hover:text-red-600 transition-colors duration-300"
                >
                  <i class="fas fa-times-circle text-xl"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-white backdrop-blur-lg bg-opacity-90 shadow-xl rounded-2xl p-8 transform transition-all duration-300 hover:shadow-2xl">
          <h2 class="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            العناصر المحفوظة
          </h2>
          <div v-if="likedItems.length === 0" class="text-gray-500 text-center py-8">
            <i class="fas fa-heart text-4xl mb-4 text-purple-300"></i>
            <p>لا توجد عناصر محفوظة.</p>
          </div>
          <div v-else class="space-y-4">
            <div
              v-for="item in savedItems"
              :key="item.id"
              class="group bg-purple-50 rounded-xl p-4 transition-all duration-300 hover:bg-purple-100"
            >
              <div class="flex items-center space-x-4 space-x-reverse">
                <img
                  :src="item.cover_image"
                  :alt="item.title"
                  class="h-20 w-20 object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105"
                />
                <div class="flex-1">
                  <h3 class="font-semibold text-lg text-gray-800">{{ item.title }}</h3>
                  <p class="text-sm text-gray-600 mt-1">{{ item.short_summary }}</p>
                </div>
                <button
                  @click="unsaveItem(item.id)"
                  class="text-red-500 hover:text-red-600 transition-colors duration-300"
                >
                  <i class="fas fa-times-circle text-xl"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- Similar styling for Saved Items section -->
      </div>

      <!-- Saved Items Sections -->
      <div class="grid md:grid-cols-2 gap-6 my-8">


        <!-- Similar styling for Saved Items section -->
      </div>
    </div>
    <FooterSection/>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axiosInstance from '@/utils/axiosConfig';
import HeaderSection from '@/components/sections/HeaderSection.vue'
import FooterSection from '@/components/sections/FooterSection.vue'

const user = ref({});
const likedItems = ref([]);
const savedItems = ref([]);
const editing = ref(false);

// Fetch Profile Data
const fetchProfile = async () => {
  try {
    const response = await axiosInstance.get('http://localhost:8000/api/profile');
    user.value = response.data.user;
    likedItems.value = response.data.liked_items;
    savedItems.value = response.data.saved_items;
  } catch (error) {
    console.error('Error fetching profile:', error);
  }
};

// Update Profile
const updateProfile = async () => {
  try {
    const updatedData = {
      name: user.value.username,
      email: user.value.email,
      password: user.value.password || undefined,
      password_confirmation: user.value.password_confirmation || undefined,
    };
    await axiosInstance.put('http://localhost:8000/api/profile', updatedData);
    editing.value = false;
    alert('تم تحديث المعلومات بنجاح');
  } catch (error) {
    console.error('Error updating profile:', error);
    alert('حدث خطأ أثناء تحديث المعلومات.');
  }
};

// Unlike Item
const unlikeItem = async (itemId) => {
  try {
    await axiosInstance.delete(`http://localhost:8000/api/profile/liked-items/${itemId}/unlike`);
    likedItems.value = likedItems.value.filter((item) => item.id !== itemId);
  } catch (error) {
    console.error('Error unliking item:', error);
  }
};

// Unsave Item
const unsaveItem = async (itemId) => {
  try {
    await axiosInstance.delete(`http://localhost:8000/api/profile/saved-items/${itemId}/unsave`);
    savedItems.value = savedItems.value.filter((item) => item.id !== itemId);
  } catch (error) {
    console.error('Error unsaving item:', error);
  }
};

// Toggle Edit Mode
const toggleEdit = () => {
  editing.value = !editing.value;
};

// Fetch Data on Mount
onMounted(fetchProfile);
</script>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

/* Add smooth scrolling to the whole page */
html {
  scroll-behavior: smooth;
}

/* Add custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #9333ea;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #7c3aed;
}
</style>

