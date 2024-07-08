<template>
  <div class="flex justify-center items-center">
    <router-link to="/" class="block text-blue-500 hover:underline absolute top-0 left-0 m-4">
      <button class="bg-blue-500 text-white px-4 py-2 rounded">Back</button>
    </router-link>
    <div class="bg-white p-8 rounded shadow">
      <h1 class="text-2xl font-bold mb-4">Ajouter une Nouvelle Recette</h1>
      <form @submit.prevent="addRecipe" class="space-y-4">
        <label class="flex flex-col">
          Nom :
          <input
            v-model="name"
            required
            class="border border-gray-300 px-2 py-1 rounded focus:border-blue-500"
          />
        </label>
        <label class="flex flex-col">
          Description :
          <textarea
            v-model="description"
            required
            class="border border-gray-300 px-2 py-1 rounded focus:border-blue-500"
          ></textarea>
        </label>
        <label class="flex flex-col">
          Ingrédients :
          <div
            class="border border-gray-300 px-2 py-1 rounded focus:border-blue-500 h-40 overflow-y-auto"
          >
            <div v-for="ingredient in ingredients" :key="ingredient">
              <label class="flex items-center">
                <input
                  type="checkbox"
                  v-model="selectedIngredients"
                  :value="ingredient"
                  class="mr-2"
                />
                {{ ingredient }}
              </label>
            </div>
          </div>
        </label>
        <label class="flex flex-col">
          Instructions :
          <div>
            <div v-for="(step, index) in instructions" :key="index">
              <input
                v-model="instructions[index]"
                required
                class="border border-gray-300 px-2 py-1 rounded focus:border-blue-500 mb-2"
              />
            </div>
            <button
              type="button"
              @click="addStep"
              class="bg-blue-500 text-white px-4 py-2 rounded mt-2"
            >
              Add Step
            </button>
          </div>
        </label>
        <label class="flex flex-col">
          Image :
          <input
            type="file"
            @change="handleFileUpload"
            class="border border-gray-300 px-2 py-1 rounded focus:border-blue-500"
          />
        </label>
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Ajouter</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()

const name = ref('')
const description = ref('')
const instructions = ref<string[]>([])
const selectedIngredients = ref([])
const image = ref<File | null>(null)
const imageBase64 = ref<string | null>(null)
const ingredients = ref([
  'Tomatoes',
  'Cheese',
  'Pepperoni',
  'Olives',
  'Mushrooms',
  'Peppers',
  'Onions',
  'Sausage',
  'Bacon',
  'Ham',
  'Pineapple',
  'Spinach',
  'Garlic',
  'Chicken',
  'Beef',
  'Broccoli',
  'Corn',
  'Jalapenos',
  'Anchovies',
  'Tuna'
])

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const reader = new FileReader()
    reader.onload = (e) => {
      imageBase64.value = e.target?.result as string
    }
    reader.readAsDataURL(target.files[0])
    image.value = target.files[0]
  }
}

// Adds a new empty step to the instructions array
const addStep = () => {
  instructions.value.push('')
}

const addRecipe = () => {
  if (image.value && imageBase64.value) {
    const recipe = {
      id: Date.now(),
      name: name.value,
      description: description.value,
      ingredients: selectedIngredients.value,
      instructions: instructions.value,
      image: imageBase64.value,
      done: false
    }
    store.commit('addRecipe', recipe)
    router.push('/')
  }
}
</script>
