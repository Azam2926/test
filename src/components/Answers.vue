<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 m-4">
    <Answer
      v-for="answer in answers"
      :key="answer.id"
      @takeAnswer="takeAnswer"
      :answer="answer"
    />
  </div>
</template>

<script>
import Answer from "./Answer.vue";

export default {
  name: "Answers",
  components: { Answer },
  props: {
    answers: {
      type: Object,
      required: true,
    },
  },

  methods: {
    takeAnswer(answer) {
      const answers = this.answers.map((item) => {
        if (item.id === answer.id) item.isSelected = true;
        else item.isSelected = false;

        return item;
      });
      this.$emit("takeAnswer", answers);
    },
  },
};
</script>