<template>
  <div
    @click="navigateToDetail()"
    class="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-2xl transition duration-300 cursor-pointer"
  >
    <img :src="targetItem.cover_image" :alt="targetItem.title" class="h-40 w-full object-cover" />
    <div class="p-4 flex flex-col">
      <h3 class="text-lg font-semibold text-gray-900">{{ targetItem.title }}</h3>
      <p>{{targetItem.section}}</p>
      <p class="text-gray-600 text-sm mt-2">{{ targetItem.short_summary }}</p>
    </div>
  </div>
</template>

<script setup>
import {computed} from 'vue'
import { useRouter } from 'vue-router'
import {useItemStore} from '@/Stores/ItemStore.js'

const itemStore = useItemStore()
const {mostViewedItems} = itemStore
// console.log(mostViewedItems)
const props = defineProps({ podcastId: { type: Number, required: true } })

const targetItem = computed( () =>
  mostViewedItems.value.find(p => p.id === props.podcastId)
)
const router = useRouter()

const navigateToDetail = () => {
  router.push({ name: 'PodcastDetail', params: { id: targetItem.value.id } })
}
</script>
