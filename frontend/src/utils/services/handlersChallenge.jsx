import { useRouter } from 'next/navigation'
import userResponseChallengePost from '../cahllengeRequest/userResponseChallengePost'
import { useEffect, useState } from 'react'
export const useResponseChallenge = () => {
  const [token, setToken] = useState('')
  const router = useRouter()
  useEffect(() => {
    setToken(localStorage.getItem('idKey'))
  }, [])
  const responseChallengeHandler = (e) => {
    e.preventDefault()
    const challengeData = Object.fromEntries(new FormData(e.currentTarget))
    challengeData.theme &&
    challengeData.question &&
    challengeData.response &&
    challengeData.pointsWin
      ? userResponseChallengePost(challengeData, token, router)
      : {}
  }
  const goBackHandler = () => {
    router.push('/')
  }
  return { goBackHandler, responseChallengeHandler }
}
