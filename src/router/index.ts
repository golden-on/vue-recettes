import { createRouter, createWebHistory } from 'vue-router'
import AddRecipe from '../views/AddRecipe.vue'
import RecipeList from '../views/RecipeList.vue'

const routes = [
  { path: '/', component: RecipeList },
  { path: '/add-recipe', component: AddRecipe }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
