<template>
  <div class="p-4 md:p-6">
    <h1 class="text-xl md:text-2xl font-bold mb-4">Liste des Recettes</h1>
    <StatusFilter :filterStatus="filterStatus" @update:filter="updateFilter" />
    <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <li
        v-for="recipe in paginatedRecipes"
        :key="recipe.id"
        class="border p-4 rounded-md shadow-md flex flex-col h-full"
        @click="showRecipeModal(recipe)"
      >
        <h2 class="text-lg md:text-xl font-semibold">{{ recipe.name }}</h2>
        <p class="text-sm md:text-base">{{ recipe.description }}</p>
        <img
          :src="recipe.image"
          alt="Image de la recette"
          class="w-full mt-2"
          style="height: 200px; object-fit: cover"
          loading="lazy"
        />
        <h3 class="font-semibold mt-2">Ingredients:</h3>
        <div class="flex flex-wrap mt-1">
          <span
            v-for="ingredient in recipe.ingredients"
            :key="ingredient"
            class="bg-gray-200 px-2 py-1 rounded-full mr-2 mb-2 text-xs md:text-sm"
            >{{ ingredient }}</span
          >
        </div>
        <div class="mt-auto pt-4 flex justify-between items-center">
          <button
            @click.stop="toggleStatus(recipe)"
            class="px-3 py-1 md:px-4 md:py-2 bg-blue-500 text-white rounded hover:bg-blue-700 text-xs md:text-sm"
          >
            {{ recipe.done ? 'En attente' : 'Réalisée' }}
          </button>
          <span
            @click="showRecipeModal(recipe)"
            class="text-blue-500 cursor-pointer hover:underline text-xs md:text-sm self-end"
          >
            see instructions...
          </span>
        </div>
      </li>
    </ul>
    <Pagination
      :currentPage="currentPage"
      :maxPages="maxPages"
      @update:currentPage="updateCurrentPage"
    />
    <router-link
      to="/add-recipe"
      class="block mt-4 text-blue-500 hover:underline text-sm md:text-base"
      >Ajouter une nouvelle recette</router-link
    >
  </div>
  <RecipeModal :recipe="selectedRecipe" v-model:isVisible="showModal"></RecipeModal>
</template>

<script setup lang="ts">
import RecipeModal from '@/components/RecipeModal.vue'
import StatusFilter from '@/components/StatusFilter.vue'
import axios from 'axios'
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import Pagination from '../components/Pagination/Pagination.vue'

const store = useStore()
const filterStatus = ref('all')
const showModal = ref(false)
const selectedRecipe = ref(null)
const currentPage = ref(1)
const pageSize = ref(6)

const filteredRecipes = computed(() => {
  if (filterStatus.value === 'all') return store.state.recipes
  return store.state.recipes.filter(
    (recipe: any) => recipe.done === (filterStatus.value === 'done')
  )
})

const toggleStatus = (recipe: any) => {
  store.commit('toggleRecipeStatus', recipe)
}
const updateFilter = (status: any) => {
  filterStatus.value = status
}
const showRecipeModal = (recipe: any) => {
  selectedRecipe.value = recipe
  showModal.value = true
}

const maxPages = computed(() => Math.ceil(filteredRecipes.value.length / pageSize.value))
const updateCurrentPage = (page: number) => {
  currentPage.value = page
}

const paginatedRecipes = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredRecipes.value.slice(start, end)
})

const fetchRecipes = async () => {
  try {
    const response = await axios.get('data/Recipes.json')
    console.log('Recipes data:', response.data) // Corrected log message
    response.data.forEach((recipe: any) => {
      store.commit('addRecipe', recipe)
    })
  } catch (error) {
    console.error('Failed to load recipes:', error)
  }
}

onMounted(fetchRecipes)
</script>
