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
        id_user: '576cfeff-905d-4b3b-bf7e-7597e71bca77',
        quest_number: 10
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    .then(function (res) {
      dispatch(setQuestions(res.data))
      router.push('/challenges')
    })
    .catch(function (err) {
      console.log(err)
    })
}

export default challengeRequestPost
