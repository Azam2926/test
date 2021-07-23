import httpClient from './http.service'

const testService = {
  get () {
    return httpClient.get('question?expand=questionAnswers')
  },
  submitAnswers (answers) {
    return httpClient.post('question/check-answers', answers)
  },
}

export default testService
