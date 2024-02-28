import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import challengeRequestPost from '../challengeRequest/questionChallengePost'
const questionsDesafios = [
  {
    title:
      "Declara una variable llamada 'platoFavorito' y asígnale el valor 'pizza'."
  },
  {
    title:
      "Crea una variable llamada 'estaciónDelAño' y asígnale el valor 'otoño'."
  },
  {
    title:
      "Declara una variable llamada 'deporteFavorito' y asígnale el valor 'baloncesto'."
  },
  {
    title:
      "Crea una variable llamada 'ciudadSoñada' y asígnale el valor 'Nueva York'."
  },
  {
    title:
      "Declara una variable llamada 'marcaDeRopa' y asígnale el valor 'Nike'."
  },
  {
    title:
      "Crea una variable llamada 'actorFavorito' y asígnale el valor 'Leonardo DiCaprio'."
  },
  {
    title:
      "Declara una variable llamada 'libroPreferido' y asígnale el valor '1984'."
  },
  {
    title:
      "Crea una variable llamada 'redSocialPreferida' y asígnale el valor 'Instagram'."
  },
  {
    title:
      "Declara una variable llamada 'instrumentoMusical' y asígnale el valor 'piano'."
  },
  {
    title:
      "Crea una variable llamada 'bebidaFriaPreferida' y asígnale el valor 'limonada'."
  }
]
export const useQuestionChallenge = () => {
  const [questions, setQuestions] = useState([])
  const [token, setToken] = useState('')
  const [questionRender, setQuestionRender] = useState()
  const [questionNumber, setQuestionNumber] = useState(0)
  const router = useRouter()
  useEffect(() => {
    setToken(localStorage.getItem('idKey'))
  }, [])
  useEffect(() => {
    setQuestionNumber(questionNumber)
    setQuestionRender(questionRender)
  }, [questionNumber])
  for (let i = questionNumber; i < questionsDesafios.length; i++) {
    useEffect(() => {
      setQuestionRender(questionsDesafios[i].title)
    }, [questionNumber])
    break
  }
  const handlerQuestionChallengePost = () => {
    challengeRequestPost(token, router, setQuestions)
  }
  const goBackHandler = () => {
    router.push('/')
  }

  const questionVisible = (e) => {
    e.preventDefault()

    questionNumber === questionsDesafios.length - 1
      ? setQuestionNumber(0)
      : setQuestionNumber(questionNumber + 1)
    console.log(questionNumber)
  }
  console.log(questions)
  return {
    goBackHandler,
    handlerQuestionChallengePost,
    questions,
    questionVisible,
    setQuestionNumber,
    questionNumber,
    questionRender
  }
}
