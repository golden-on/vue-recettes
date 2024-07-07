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
        :currentStatus="filterStatus"
        statusValue="all"
        :roundedLeft="true"
        @update:filter="updateFilter"
      /><FilterButton
        label="Réalisées"
        :currentStatus="filterStatus"
        statusValue="done"
        @update:filter="updateFilter"
      /><FilterButton
        label="En attente"
        :currentStatus="filterStatus"
        statusValue="pending"
        :roundedRight="true"
        @update:filter="updateFilter"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import filter from '../assets/logos/filtre.png'
import FilterButton from './FilterButton.vue'

export default defineComponent({
  components: {
    FilterButton
  },
  name: 'StatusFilter',
  props: {
    filterStatus: String
  },
  data() {
    return {
      filter
    }
  },
  methods: {
    updateFilter(status: string) {
      this.$emit('update:filter', status)
    }
  }
})
</script>
