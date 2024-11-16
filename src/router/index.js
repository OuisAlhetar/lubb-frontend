import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/HomePage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import SignupPage from '@/pages/SignupPage.vue'
import CategoryPage from '@/pages/CategoryPage.vue'
import AboutPage from '@/pages/AboutPage.vue'
import BrowseTopicsSection from '@/components/sections/BrowseTopicsSection.vue'
import PodcastDetail from '@/pages/PodcastDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: AboutPage
    },
    {
      path: '/categories',
      name: 'categories',
      component: BrowseTopicsSection,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupPage
    },
    {
      path: '/category/:category',
      name: 'CategoryPage',
      component: CategoryPage,
      props: true,
    },
    // {
    //   path: '/category/:category/:image',
    //   name: 'CategoryPage',
    //   component: CategoryPage,
    //   props: route => ({
    //     category: route.params.category,
    //     image: decodeURIComponent(route.params.image)
    //   })
    // },
    {
      path: '/podcast/:id',
      name: 'PodcastDetail',
      component: PodcastDetail,
      props: true,
    },
  ]
})

export default router