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
  const error = err.response.status
  err.response.status === errorsAuth.find((err) => error === err.code).code
    ? setErrorAuth(
        errorsAuth
          .filter((err) => error === err.code)
          .map((err) => err.message)[0]
      )
    : {}
}
