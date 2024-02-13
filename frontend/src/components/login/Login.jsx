'use client'
import loginPost from '@/utils/authRequest/loginPost'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const Login = () => {
  const router = useRouter()
  const loginHandler = (e) => {
    e.preventDefault()
    const userData = Object.fromEntries(new FormData(e.currentTarget))
    console.log(userData)
    userData.userEmail && userData.userPassword
      ? loginPost(userData, router)
      : {}
  }
  return (
    <section className='flex flex-col gap-5 items-center justify-center w-full h-screen'>
      <h1>Iniciar sesión</h1>
      <form
        action=''
        onSubmit={loginHandler}
        className='flex flex-col gap-5 items-center'
      >
        <label htmlFor='userEmail' className='flex flex-col'>
          Email
          <input
            type='email'
            name='userEmail'
            id=''
            className='border-2 border-black rounded'
          />
        </label>
        <label htmlFor='userPassword' className='flex flex-col'>
          Contraseña
          <input
            type='password'
            name='userPassword'
            id=''
            className='border-2 border-black rounded'
          />
        </label>
        <input type='submit' value='Acceder' />
      </form>
      <Link href={'/register'}>
        <small>No tienes una cuenta?</small>Registrarse
      </Link>
    </section>
  )
}

export default Login
