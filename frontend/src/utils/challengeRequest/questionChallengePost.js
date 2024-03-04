import { setQuestions } from '@/redux/challengeSlice'
import axios from 'axios'

const challengeRequestPost = async (token, router, dispatch) => {
  setQuestions()
  await axios
    .post(
      `${process.env.NEXT_PUBLIC_API_URL}/openai/question`,
      {
        theme: 'arrays',
        level: 'principiante',
        id_user: 'baf51002-9a3e-4ffe-add1-e096139d9381',
        quest_number: 10
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    .then(function (res) {
      console.log(res.data)
      dispatch(setQuestions(res.data))
      router.push('/challenges')
    })
    .catch(function (err) {
      console.log(err)
    })
}

export default challengeRequestPost
