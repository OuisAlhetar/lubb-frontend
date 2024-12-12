<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="text-center">
      <h2>Processing Google Login...</h2>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
// import axios from 'axios';

const router = useRouter();

onMounted(async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');

  if (!token) {
    alert('Failed to login with Google.');
    router.push('/login');
    return;
  }

  // Save token and user details to localStorage
  localStorage.setItem('authToken', token);

  // Redirect to home page or dashboard
  router.push('/');
});
</script>
