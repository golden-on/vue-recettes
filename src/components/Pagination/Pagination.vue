<template>
  <div class="flex justify-between mt-4">
    <button
      @click="changePage(props.currentPage - 1)"
      :disabled="props.currentPage <= 1"
      class="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 disabled:opacity-50"
    >
      Previous
    </button>
    <button
      @click="changePage(props.currentPage + 1)"
      :disabled="props.currentPage >= props.maxPages"
      class="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 disabled:opacity-50"
    >
      Next
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue'

const props = defineProps<{
  currentPage: number
  maxPages: number
}>()

const emit = defineEmits(['update:currentPage'])

const changePage = (page: number) => {
  emit('update:currentPage', page)
}
</script>
