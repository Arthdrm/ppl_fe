import { createRouter, createWebHistory } from 'vue-router'
import Mahasiswa from '../views/Mahasiswa.vue'
import Krs from "@/views/Krs.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'mahasiswa',
      component: Mahasiswa
    },
    {
      path: '/krs',
      name: 'krs',
      component: Krs
    },
  ]
})

export default router
