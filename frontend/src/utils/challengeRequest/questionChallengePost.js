import { setQuestions } from '@/redux/challengeSlice'
import axios from 'axios'

const challengeRequestPost = async (questionData, token, router, dispatch) => {
  setQuestions()
  await axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/openai/question`, questionData, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(function (res) {
      console.log(res.data)
      dispatch(setQuestions(res.data))
      res?.data[0]?.question
        ? router.push('/challenges')
        : alert(res.data.last_error.code)
    })
    .catch(function (err) {
      console.log(err)
    })
}

export default challengeRequestPost
