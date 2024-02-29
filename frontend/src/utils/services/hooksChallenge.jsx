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
  useEffect(() => {
    setToken(localStorage.getItem('idKey'))
  }, [])
  useEffect(() => {
    setQuestionNumber(questionNumber)
    setQuestionRender(questionRender)
  }, [questionNumber])
  useEffect(() => {
    for (
      let i = questionNumber;
      i < questionsDesafios?.questions?.length;
      i++
    ) {
      setQuestionRender(questionsDesafios?.questions[i].title)
      break
    }
  }, [questionNumber])
  const handlerQuestionChallengePost = () => {
    challengeRequestPost(token, router, dispatch)
  }
  const goBackHandler = () => {
    router.push('/')
  }

  const questionVisible = () => {
    questionNumber === questionsDesafios?.questions.length - 1
      ? (setQuestionNumber(0), setFeedback(''))
      : setQuestionNumber(questionNumber + 1),
      setFeedback('')
    // console.log(questionNumber)
  }
  const handlerResponseChallengePost = (e) => {
    e.preventDefault()
    challengeResponsePost(token, setFeedback)
  }
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
