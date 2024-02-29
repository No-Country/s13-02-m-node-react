import { useRouter } from 'next/navigation'
import loginPost from '@/utils/authRequest/loginPost'
import registerPost from '../authRequest/registerPost'
import { useState } from 'react'
import { errorsAuth } from '../errors/errorsAuth'
export const useAuthHandler = () => {
  const [errorAuth, setErrorAuth] = useState('')
  const router = useRouter()
  const loginHandler = (e) => {
    e.preventDefault()
    const userData = Object.fromEntries(new FormData(e.currentTarget))
    userData.email && userData.password
      ? loginPost(userData, router, setErrorAuth)
      : {}
  }
  const registerHandler = (e) => {
    e.preventDefault()
    const userData = Object.fromEntries(new FormData(e.currentTarget))
    userData.email && userData.password && userData.username
      ? registerPost(userData, router, setErrorAuth)
      : {}
  }
  return { loginHandler, registerHandler, errorAuth }
}

export const errorAuthManagement = (err, setErrorAuth) => {
  const errorCode = err.response.data.statusCode
  const messageCode = err.response.data.message
  const e = errorsAuth.find((err) => errorCode === err.code)
  // .map((msj) => msj.messageEmail)[0]
  switch (messageCode) {
    case e.serverEmailMessage:
      setErrorAuth(e.messageEmail)
      break
    case e.serverUsernameMessage:
      setErrorAuth(e.messageUsername)
      break
    case e.serverPasswordMessage:
      setErrorAuth(e.messagePassword)
      break
    default:
      setErrorAuth(e.message)
  }
}
