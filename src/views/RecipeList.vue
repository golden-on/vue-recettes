<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Liste des Recettes</h1>
    <div class="mb-4">
      <label for="filter" class="block mb-2">Filtrer par statut :</label>
      <select v-model="filterStatus" id="filter" class="border p-2">
        <option value="all">Toutes</option>
        <option value="done">Réalisées</option>
        <option value="pending">En attente</option>
      </select>
    </div>
    <ul class="space-y-4">
      <li v-for="recipe in filteredRecipes" :key="recipe.id" class="border p-4 rounded">
        <h2 class="text-xl font-semibold">{{ recipe.name }}</h2>
        <p>{{ recipe.description }}</p>
        <img :src="recipe.image" alt="Image de la recette" class="w-full h-auto mt-2" />
        <p class="mt-2">Ingrédients : {{ recipe.ingredients.join(', ') }}</p>
        <p>Instructions : {{ recipe.instructions }}</p>
        <button
          @click="toggleStatus(recipe)"
          class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          {{ recipe.done ? 'Marquer en attente' : 'Marquer comme réalisée' }}
        </button>
      </li>
    </ul>
    <router-link to="/add-recipe" class="block mt-6 text-blue-500 hover:underline"
      >Ajouter une nouvelle recette</router-link
    >
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()
    const filterStatus = ref('all')

    const filteredRecipes = computed(() => {
      if (filterStatus.value === 'all') return store.state.recipes
      return store.state.recipes.filter(
        (recipe: any) => recipe.done === (filterStatus.value === 'done')
      )
    })

    const toggleStatus = (recipe: any) => {
      store.commit('toggleRecipeStatus', recipe)
    }

    return {
      filterStatus,
      filteredRecipes,
      toggleStatus
    }
  }
})
</script>

<style scoped>
/* Ajoutez votre style ici */
</style>
