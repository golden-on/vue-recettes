import RecipeList from '@/views/RecipeList.vue'
import { createRouter, createWebHistory } from 'vue-router'
import AddRecipe from '../components/AddRecipe.vue'

const routes = [
  { path: '/', component: RecipeList },
  { path: '/add-recipe', component: AddRecipe }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
