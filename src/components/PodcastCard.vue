<template>
  <div
    @click="navigateToDetail()"
    class="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-2xl transition duration-300 cursor-pointer h-full flex flex-col"
  >
    <!-- Image container with fixed aspect ratio -->
    <div class="relative w-full pt-[56.25%]">
      <img
        :src="targetItem.cover_image"
        :alt="targetItem.title"
        class="absolute top-0 left-0 w-full h-full object-cover"
      />
    </div>

    <!-- Content container -->
    <div class="p-4 flex flex-col flex-grow">
      <h3 class="text-lg font-semibold text-gray-900 line-clamp-2 mb-2">{{ targetItem.title }}</h3>
      <p class="text-purple-600 text-sm mb-2">{{targetItem.section}}</p>
      <p class="text-gray-600 text-sm line-clamp-3 flex-grow">{{ targetItem.short_summary }}</p>
    </div>
  </div>
</template>

<script setup>
import {computed} from 'vue'
import { useRouter } from 'vue-router'
import {useItemStore} from '@/Stores/ItemStore.js'

const itemStore = useItemStore()
const {mostViewedItems} = itemStore
const props = defineProps({ podcastId: { type: Number, required: true } })

const targetItem = computed( () =>
  mostViewedItems.value.find(p => p.id === props.podcastId)
)
const router = useRouter()

const navigateToDetail = () => {
  router.push({ name: 'PodcastDetail', params: { id: targetItem.value.id } })
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>