<template>
  <button
    :class="{
      'bg-blue-500 text-white': props.currentStatus === statusValue,
      'bg-gray-300 text-gray-700': props.currentStatus !== statusValue,
      'rounded-l-md': props.roundedLeft,
      'rounded-r-md': props.roundedRight
    }"
    class="border p-2"
    @click="$emit('update:filter', props.statusValue)"
  >
    {{ props.label }}
  </button>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  label: string
  currentStatus: string
  statusValue: string
  roundedLeft: boolean
  roundedRight: boolean
}>()
</script>
