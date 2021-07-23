<template>
  <div class="
            w-full min-h-[6rem] h-auto
            bg-gradient-to-r from-green-400 to-green-300
            hover:from-green-300 hover:to-green-400
            flex items-center
            font-bold text-2xl text-white
            shadow-lg rounded
            cursor-pointer
            p-2
           overflow-auto"
       @click="takeAnswer"
       :class="{'from-pink-400 to-pink-300 hover:from-pink-300 hover:to-pink-400': answer.isSelected,}"
  >
    {{ answer.content }}
  </div>
</template>

<script>
export default {
  name: 'Answer',
  props: {
    answer: Object,
  },

  methods: {
    takeAnswer () {
      this.$emit('takeAnswer', this.answer)
    },
  },

  // beforeUpdate() {
  //   console.log(this.question);
  // },
  // updated() {
  //   console.log(this.question);
  // },
}
</script>