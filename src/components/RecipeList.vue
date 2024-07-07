<template>
  <div>
    <h1>Liste des Recettes</h1>
    <ul>
      <li v-for="recipe in recipes" :key="recipe.id">
        <h2>{{ recipe.name }}</h2>
        <p>{{ recipe.description }}</p>
        <img :src="recipe.image" alt="Image de la recette" />
        <p>Ingrédients : {{ recipe.ingredients.join(', ') }}</p>
        <p>Instructions : {{ recipe.instructions }}</p>
        <button @click="toggleStatus(recipe)">
          {{ recipe.done ? 'Marquer en attente' : 'Marquer comme réalisée' }}
        </button>
      </li>
    </ul>
    <router-link to="/add-recipe">Ajouter une nouvelle recette</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import { State } from '../store'

export default defineComponent({
  setup() {
    const store = useStore<State>()

    const toggleStatus = (recipe: any) => {
      store.commit('toggleRecipeStatus', recipe)
    }

    return {
      recipes: store.state.recipes,
      toggleStatus
    }
  }
})
</script>
