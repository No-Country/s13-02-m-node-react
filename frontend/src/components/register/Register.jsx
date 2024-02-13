'use client'
import registerPost from '@/utils/authRequest/registerPost'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
const Register = () => {
  const router = useRouter()
  const registerHandler = (e) => {
    e.preventDefault()
    const userData = Object.fromEntries(new FormData(e.currentTarget))
    console.log(userData)
    userData.userEmail && userData.userPassword
      ? registerPost(userData, router)
      : {}
  }
  return (
    <section className='flex flex-col gap-5 items-center justify-center w-full h-screen'>
      <h1>Crear cuenta</h1>
      <form
        action=''
        onSubmit={registerHandler}
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
        <input type='submit' value='Registrase' />
      </form>
      <Link href={'/login'}>
        <small>Ya tienes una cuenta?</small> Inicia sesión
      </Link>
    </section>
  )
}

export default Register
