import axios from 'axios'

const challengeResponsePost = async (token, setFeedback) => {
  await axios
    .post(
      `${process.env.NEXT_PUBLIC_API_URL}/openai/question/correct `,
      {
        id_user: '576cfeff-905d-4b3b-bf7e-7597e71bca77',
        question: `Declara una variable llamada 'colorDeCocheSoñado' y asígnale el valor 'negro mate'.`,
        response: `const colorDeCocheSoñado = 'negro mate' `
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    .then(function (res) {
      console.log(res)
      setFeedback(res)
    })
    .catch(function (err) {
      console.log(err)
    })
}

export default challengeResponsePost
