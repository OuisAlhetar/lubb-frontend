<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-200 to-white w-screen">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </div>
</template>

<script setup>

</script>