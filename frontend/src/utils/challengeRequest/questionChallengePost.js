import { setQuestions } from '@/redux/challengeSlice'
import axios from 'axios'

const challengeRequestPost = async (questionData, token, router, dispatch) => {
  setQuestions()
  await axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/openai/question`, questionData, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(function (res) {
      console.log(res)
      dispatch(setQuestions(res.data))
      router.push('/challenges')
    })
    .catch(function (err) {
      console.log(err)
    })
}

export default challengeRequestPost
