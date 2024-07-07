<template>
  <div>
    <h1>Ajouter une Nouvelle Recette</h1>
    <form @submit.prevent="addRecipe">
      <label>Nom : <input v-model="name" required /></label>
      <label>Description : <textarea v-model="description" required></textarea></label>
      <label>Ingrédients : <input v-model="ingredients" required /></label>
      <label>Instructions : <textarea v-model="instructions" required></textarea></label>
      <label>Image : <input type="file" @change="handleFileUpload" /></label>
      <button type="submit">Ajouter</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()

    const name = ref('')
    const description = ref('')
    const ingredients = ref('')
    const instructions = ref('')
    const image = ref<File | null>(null)

    const handleFileUpload = (event: Event) => {
      const target = event.target as HTMLInputElement
      if (target.files) {
        image.value = target.files[0]
      }
    }

    const addRecipe = () => {
      if (image.value) {
        const recipe = {
          name: name.value,
          description: description.value,
          ingredients: ingredients.value.split(','),
          instructions: instructions.value,
          image: URL.createObjectURL(image.value),
          done: false
        }
        store.commit('addRecipe', recipe)
        router.push('/')
      }
    }

    return {
      name,
      description,
      ingredients,
      instructions,
      image,
      handleFileUpload,
      addRecipe
    }
  }
})
</script>
