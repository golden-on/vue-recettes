<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center"
    v-if="isVisible"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full m-4 relative">
      <span class="absolute top-0 right-2 text-2xl cursor-pointer" @click="close">&times;</span>
      <div class="mb-4 pt-3">
        <img :src="recipe.image" alt="Recipe Image" class="w-full h-40 rounded-lg mb-4" />
        <h2 class="text-2xl font-bold mb-2">{{ recipe.name }}</h2>
        <p class="mb-4">{{ recipe.description }}</p>
        <h3 class="font-semibold">Ingredients:</h3>
        <ul class="list-disc pl-5 mb-4">
          <li v-for="ingredient in recipe.ingredients" :key="ingredient">{{ ingredient }}</li>
        </ul>
        <h3 class="font-semibold mb-4">Instructions:</h3>
        <div class="relative border-l-2 border-gray-200">
          <div v-for="(instruction, index) in recipe.instructions" :key="index" class="mb-6 ml-4">
            <div
              class="absolute -left-3 mt-0.5 bg-white border-2 border-gray-200 h-6 w-6 rounded-full flex items-center justify-center"
            >
              <div class="h-3 w-3 bg-blue-500 rounded-full"></div>
            </div>
            <p class="text-gray-700 text-md mb-1">{{ instruction }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recipe: Object,
    isVisible: Boolean
  },
  methods: {
    close() {
      this.$emit('update:isVisible', false)
    }
  }
}
</script>
