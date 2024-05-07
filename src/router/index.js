import { createRouter, createWebHistory } from 'vue-router'
import Mahasiswa from '../views/Mahasiswa.vue'
import Krs from "@/views/Krs.vue";
import MataKuliah from "@/views/MataKuliah.vue";
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
    {
      path: '/matakuliah',
      name: 'matakuliah',
      component: MataKuliah
    },
  ]
})

export default router
