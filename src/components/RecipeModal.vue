<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center overflow-y-auto"
    v-if="props.isVisible"
  >
    <div class="bg-white p-6 rounded-md shadow-lg max-w-3xl w-full m-4 relative h-auto">
      <span class="absolute top-0 right-2 text-2xl cursor-pointer" @click="close">&times;</span>
      <div class="mb-4 pt-3">
        <img
          :src="props.recipe.image"
          alt="Recipe Image"
          class="w-1/2 h-40 rounded-lg mb-4 mx-auto"
        />
        <h2 class="text-2xl font-bold mb-2">{{ props.recipe.name }}</h2>
        <p class="mb-4">{{ props.recipe.description }}</p>
        <h3 class="font-semibold mb-4">Instructions:</h3>
        <div class="relative border-l-2 border-gray-200">
          <div
            v-for="(instruction, index) in props.recipe.instructions"
            :key="index"
            class="mb-6 ml-4"
          >
            <div
              class="absolute -left-3 mt-0.5 bg-white border-2 border-gray-200 h-6 w-6 rounded-full flex items-center justify-center"
            >
              <div class="h-3 w-3 bg-blue-500 rounded-full"></div>
            </div>
            <p class="text-gray-700 text-md mb-1">Step {{ index + 1 }}: {{ instruction }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue'

const props = defineProps<{
  recipe: Record<string, string>
  isVisible: boolean
}>()

const emit = defineEmits(['update:isVisible'])

const close = () => {
  emit('update:isVisible', false)
}
</script>
