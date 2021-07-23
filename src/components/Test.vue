<template>
  <div class="font-sans flex justify-center items-center text-white space-y-1 py-4 sm:px-8 md:px-16">
    <ActionBtn :disabled="disabledPrev" @displayQuestion="displayPrevQuestion" roundedClass="rounded-l">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
      </svg>
    </ActionBtn>
    <div class="flex flex-col bg-purple-800 bg-opacity-50 shadow-lg !w-[1050px] h-auto">
      <Question :question="currentQuestion"/>
      <div class="grid grid-cols-2 gap-4 m-4">
        <Answer
            v-for="answer in currentQuestion.questionAnswers"
            :key="answer.id"
            @takeAnswer="takeAnswers"
            :answer="answer"
        />
      </div>
      <button
          class="bg-purple-400 bg-opacity-50 hover:bg-purple-800 font-bold py-4 px-4 shadow-lg rounded-b"
          :class="{'hidden': hiddenSubmit}"
          @click="submitAnswers"
      >
        Submit
      </button>
    </div>
    <ActionBtn :disabled="disabledNext" @displayQuestion="displayNextQuestion" roundedClass="rounded-r">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
      </svg>
    </ActionBtn>
  </div>

</template>

<script>
import testService from '../service/test.service'
import Answer from './Answer.vue'
import ActionBtn from './ActionBtn.vue'
import Question from './Question.vue'

export default {
  name: 'Test',
  components: { Question, ActionBtn, Answer },

  data () {
    return {
      questions: [],
      currentQuestion: {},
      currentIndex: 0,
      answers: [],
      results: '',
      disabledNext: false,
      disabledPrev: true,
      hiddenSubmit: true,
      asd: {
        msg: 'asd',
      },
    }
  },
  async created () {
    try {
      const res = await testService.get()
      this.questions = res.data
      this.currentQuestion = this.questions[this.currentIndex]
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

    displayNextQuestion () {
      this.currentIndex++
      if (this.currentIndex === this.questions.length - 1) {
        this.disabledNext = true
        this.hiddenSubmit = false
      } else
        this.hiddenSubmit = true

      if (
          this.currentIndex <= this.questions.length - 1 &&
          this.currentIndex > 0
      )
        this.disabledPrev = false

      this.currentQuestion = this.questions[this.currentIndex]
    },

    displayPrevQuestion () {
      this.currentIndex--
      if (this.currentIndex === 0) this.disabledPrev = true

      if (this.currentIndex <= this.questions.length - 1)
        this.disabledNext = false

      this.hiddenSubmit = true
      this.currentQuestion = this.questions[this.currentIndex]
    },

    takeAnswers (answer) {
      const result = this.answers.find(
          (obj) => obj.question_id === this.currentQuestion.id,
      )
      if (result) this.answers.splice(this.answers.indexOf(result), 1)

      this.answers.push({
        question_id: this.currentQuestion.id,
        answer_id: answer.id,
      })

      const indexQ = this.questions.findIndex((el) => el.id === this.currentQuestion.id)
      const indexA = this.questions[indexQ].questionAnswers.findIndex(
          (el) => el.id === answer.id,
      )

      this.questions[indexQ].questionAnswers = this.questions[
          indexQ
          ].questionAnswers.map((answer) => {
        answer.isSelected = false
        return answer
      })
      this.questions[indexQ].questionAnswers[indexA].isSelected = true
    },
  },
}
</script>