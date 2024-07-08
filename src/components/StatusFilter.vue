<template>
  <div
    class="mb-4"
    style="text-align: center; display: flex; column-gap: 10px; justify-content: center"
  >
    <div class="flex justify-center items-center">
      <img :src="filter" alt="Image de la recette" />
      <label class="block">Filter by:</label>
    </div>
    <div class="flex justify-center">
      <FilterButton
        label="Toutes"
        :currentStatus="props.filterStatus"
        statusValue="all"
        :roundedLeft="true"
        @update:filter="updateFilter"
      /><FilterButton
        label="Réalisées"
        :currentStatus="props.filterStatus"
        statusValue="done"
        @update:filter="updateFilter"
      /><FilterButton
        label="En attente"
        :currentStatus="props.filterStatus"
        statusValue="pending"
        :roundedRight="true"
        @update:filter="updateFilter"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue'
import filter from '../assets/logos/filtre.png'
import FilterButton from './FilterButton.vue'

const props = defineProps<{
  filterStatus: string
}>()

const emit = defineEmits(['update:filter'])

const updateFilter = (status: string) => {
  emit('update:filter', status)
}
</script>
