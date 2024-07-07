import { createStore } from 'vuex'

interface Recipe {
  id: number
  name: string
  description: string
  ingredients: string[]
  instructions: string
  image: string
  done: boolean
}

const loadRecipes = (): Recipe[] => {
  const recipes = localStorage.getItem('recipes')
  return recipes ? JSON.parse(recipes) : []
}

const saveRecipes = (recipes: Recipe[]) => {
  localStorage.setItem('recipes', JSON.stringify(recipes))
}

export default createStore({
  state: {
    recipes: loadRecipes()
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
