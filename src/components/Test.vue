<template>
  <div class="min-width-[300px] font-sans flex justify-center items-center  text-white py-4 sm:px-4 md:px-4">
    <ActionBtn :disabled="disabledPrev" @displayQuestion="currentIndex--" roundedClass="rounded-l">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
      </svg>
    </ActionBtn>
    <div class="flex flex-col bg-purple-800 bg-opacity-50 shadow-lg rounded  !w-[1050px] h-auto">
      <Question :question="currentQuestion"/>
      <Answers :answers="currentQuestion.questionAnswers" @takeAnswer="takeAnswers"/>
      <button
          class="bg-purple-400 bg-opacity-50 hover:bg-purple-800 font-bold py-4 px-4 shadow-lg rounded-b"
          :class="{ hidden: hiddenSubmit }"
          @click="submitAnswers"
      >
        Submit
      </button>
    </div>
    <ActionBtn :disabled="disabledNext" @displayQuestion="currentIndex++" roundedClass="rounded-r">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
      </svg>
    </ActionBtn>
  </div>
</template>

<script>
import testService from '../service/test.service'
import Question from './Question.vue'
import Answers from './Answers.vue'
import ActionBtn from './ActionBtn.vue'

export default {
  name: 'Test',
  components: { Question, ActionBtn, Answers },
  data () {
    return {
      questions: [],
      currentIndex: 0,
      answers: [],
      results: '',
    }
  },
  async created () {
    try {
      const res = await testService.get()
      this.questions = res.data
    } catch (e) {
      console.log(e)
    }
  },
  methods: {
    async submitAnswers () {
      try {
        const res = await testService.submitAnswers(this.answers)
        this.results = res.data
        // this.hiddenSubmit = true
      } catch (e) {
        console.log(e)
      }
    },
    takeAnswers (answers) {
      this.questions[this.currentIndex].questionAnswers = answers
    },
  },
  computed: {
    currentQuestion () {
      return this.questions[this.currentIndex] ?? testService.loadingQuestion
    },
    disabledPrev () {
      return this.currentIndex === 0
    },
    disabledNext () {
      return this.currentIndex === this.questions.length - 1
    },
    hiddenSubmit () {
      return this.currentIndex !== this.questions.length - 1
    },
  },
}
</script>