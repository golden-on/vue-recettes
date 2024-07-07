<template>
  <button
    :class="{
      'bg-blue-500 text-white': currentStatus === statusValue,
      'bg-gray-300 text-gray-700': currentStatus !== statusValue,
      'rounded-l-md': roundedLeft,
      'rounded-r-md': roundedRight
    }"
    class="border p-2"
    @click="$emit('update:filter', statusValue)"
  >
    {{ label }}
  </button>
</template>

<script>
export default {
  props: {
    label: String,
    currentStatus: String,
    statusValue: String,
    roundedLeft: Boolean,
    roundedRight: Boolean
  }
}
</script>
