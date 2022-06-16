import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components/Home.vue'
import PokeID from '@/components/PokeID.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/pokeID/:id',
      name: 'pokeID',
      component: PokeID
    },

  ]
})

export default router
