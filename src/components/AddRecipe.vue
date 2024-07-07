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
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()

    const name = ref('')
    const description = ref('')
    const ingredients = ref('')
    const instructions = ref('')
    const image = ref<File | null>(null)
    const imageBase64 = ref<string | null>(null)

    // convert the image to Base64 for persistence needs
    const handleFileUpload = (event: Event) => {
      const target = event.target as HTMLInputElement
      if (target.files && target.files[0]) {
        const reader = new FileReader()
        reader.onload = (e) => {
          imageBase64.value = e.target?.result as string
        }
        reader.readAsDataURL(target.files[0]) // Read the file as a data URL (Base64)
        image.value = target.files[0]
      }
    }

    const addRecipe = () => {
      if (image.value && imageBase64.value) {
        const recipe = {
          id: Date.now(),
          name: name.value,
          description: description.value,
          ingredients: ingredients.value.split(','),
          instructions: instructions.value,
          image: imageBase64.value,
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
      imageBase64, // Make sure to return this so it's available in the template if needed
      handleFileUpload,
      addRecipe
    }
  }
})
</script>

<style scoped>
/* Ajoutez votre style ici */
</style>
