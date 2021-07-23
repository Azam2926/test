<template>
  <button class="bg-purple-400 bg-opacity-50 hover:bg-purple-800 font-bold py-2 px-4 shadow-lg "
          :class="[{ 'cursor-not-allowed': disabled }, roundedClass]"
          :disabled="disabled"
          @click="displayQuestion"
  >
    <slot/>
  </button>
</template>

<script>
export default {
  name: 'ActionBtn',
  props: {
    disabled: Boolean,
    roundedClass: String
  },

  methods: {
    displayQuestion() {
      this.$emit('displayQuestion')
    },
  },
}
</script>

<style scoped>

</style>