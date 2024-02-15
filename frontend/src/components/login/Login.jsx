'use client'
import loginPost from '@/utils/authRequest/loginPost'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import Logo from '../logo/Logo'

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
    <form
      onSubmit={loginHandler}
      className='flex flex-col gap-16 items-center justify-center w-full h-screen min-h-screen p-5  md:px-24 md:py-16 bg-rich-black-500 text-white'
    >
      <Logo size='text-xl  md:text-xl' />
      <label className='p-5 md:p-10 border-1 border-picton-blue-800 rounded-md max-w-[552px] h-auto w-full shadow-shadowAuth'>
        <div className=' gap-5 flex flex-col min-h-[230px]'>
          <h1 className='text-3xl'>Sign in</h1>
          <small>
            Nuevo usuario?{' '}
            <Link href={'/register'} className='link-none text-indigo-500'>
              Crear cuenta
            </Link>
          </small>
          <label className='flex flex-col gap-5 items-center w-full '>
            <label htmlFor='userEmail' className='flex flex-col  w-full'>
              <input
                type='email'
                name='userEmail'
                placeholder='Email'
                id=''
                className='border-2 border-black bg-black h-[56px] pl-5 outline-none'
                required
              />
            </label>
            <label htmlFor='userPassword' className='flex flex-col w-full'>
              <input
                type='password'
                name='userPassword'
                placeholder='Contraseña'
                id=''
                className='border-2 border-black bg-black h-[56px] pl-5 outline-none'
                required
              />
            </label>
          </label>
        </div>
      </label>
      <input
        type='submit'
        value='Acceder >'
        className='border-[1px] border-picton-blue-700 rounded px-4 py-2 text-picton-blue-500'
      />
    </form>
  )
}

export default Login
