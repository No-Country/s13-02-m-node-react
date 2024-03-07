import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import challengeRequestPost from '../challengeRequest/questionChallengePost'
import { useDispatch, useSelector } from 'react-redux'
import challengeResponsePost from '../challengeRequest/responseChallenge'

export const useQuestionChallenge = () => {
  const dispatch = useDispatch()
  const questionsDesafios = useSelector((state) => state.challenge)
  const [token, setToken] = useState('')
  const [questionRender, setQuestionRender] = useState()
  const [questionNumber, setQuestionNumber] = useState(0)
  const [feedback, setFeedback] = useState('')
  const router = useRouter()

  //actualizar el estado del token -> cambiar a estado global
  useEffect(() => {
    setToken(localStorage.getItem('idKey'))
  }, [])

  //actualizar el estado del numero de pregunta a responder, y la pregunta arenderizar
  useEffect(() => {
    setQuestionNumber(questionNumber)
    setQuestionRender(questionRender)
  }, [questionNumber])

  //bucle para dividir las preguntas y elegirla segun el indice y como vaya respondiendo el usuario
  useEffect(() => {
    for (
      let i = questionNumber;
      i < questionsDesafios?.questions?.length;
      i++
    ) {
      setQuestionRender(questionsDesafios?.questions[i].question)
      break
    }
  }, [questionNumber])

  //funcion handler del evento que invoca a la request para obtener las preguntas desde el bot
  const handlerQuestionChallengePost = (questionData) => {
    challengeRequestPost(questionData, token, router, dispatch)
  }

  //funcion para volver al home
  const goBackHandler = () => {
    router.push('/')
  }

  //funcion que elige la pregunta segun su indice y cambia los estados del numero(y el progreso) y la pregunta
  const questionVisible = () => {
    questionNumber === questionsDesafios?.questions.length - 1
      ? (setQuestionNumber(0), router.push('/'), setFeedback(''))
      : setQuestionNumber(questionNumber + 1),
      setFeedback('')
  }

  //funcion handler del evento que invoca la request para enviar la respuesta del usuario, y obtiene el feedback del bot
  const handlerResponseChallengePost = (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget))
    // console.log(localStorage.getItem('themeId'))
    challengeResponsePost(
      {
        ...data,
        id_theme: 'd8614141-aa62-4206-9a34-09cbf12e66aa'
      },
      token,
      setFeedback
    )
  }

  // return del custom hook
  return {
    goBackHandler,
    handlerQuestionChallengePost,
    handlerResponseChallengePost,
    questionVisible,
    setQuestionNumber,
    questionNumber,
    questionRender,
    feedback,
    setFeedback
  }
}
