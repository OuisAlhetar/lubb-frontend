import { ref } from 'vue'

// Create a singleton instance
const mostViewedItems = ref([])
// In ItemStore.js
const isLoading = ref(false)

export const useItemStore = () => {
  const setMostViewedItems = (items) => {
    mostViewedItems.value = items
  }

  const setLoading = (value) => {
    isLoading.value = value
  }

  return {
    mostViewedItems,
    setMostViewedItems,
    isLoading,
    setLoading
  }
}