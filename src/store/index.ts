import type { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'

interface Recipe {
  id: number
  name: string
  description: string
  ingredients: string[]
  instructions: string
  image: string
  done: boolean
}

// Déclarez l'état de store
interface State {
  recipes: Recipe[]
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    recipes: []
  },
  mutations: {
    addRecipe(state, recipe: Recipe) {
      state.recipes.push(recipe)
      saveRecipes(state.recipes)
    },
    toggleRecipeStatus(state, recipe: Recipe) {
      recipe.done = !recipe.done
      saveRecipes(state.recipes)
    }
  }
})

// Fonction de persistance de l'état
const saveRecipes = (recipes: Recipe[]) => {
  localStorage.setItem('recipes', JSON.stringify(recipes))
}

// Fonction de chargement des recettes depuis localStorage
const loadRecipes = (): Recipe[] => {
  const recipes = localStorage.getItem('recipes')
  return recipes ? JSON.parse(recipes) : []
}
