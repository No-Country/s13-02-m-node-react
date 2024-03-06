import axios from 'axios'

const challengeResponsePost = async (data, token, setFeedback) => {
  await axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/openai/correct `, data, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(function (res) {
      setFeedback(res.data)
    })
    .catch(function (err) {
      console.log(err)
    })
}

export default challengeResponsePost
