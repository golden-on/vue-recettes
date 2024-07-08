<template>
  <div class="flex justify-between mt-4">
    <button
      @click="changePage(currentPage - 1)"
      :disabled="currentPage <= 1"
      class="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 disabled:opacity-50"
    >
      Previous
    </button>
    <button
      @click="changePage(currentPage + 1)"
      :disabled="currentPage >= maxPages"
      class="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 disabled:opacity-50"
    >
      Next
    </button>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    maxPages: {
      type: Number,
      required: true
    }
  },
  methods: {
    changePage(page) {
      this.$emit('update:currentPage', page)
    }
  }
}
</script>
