'use client'
import Link from 'next/link'
import React from 'react'
import Logo from '../logo/Logo'
import { useAuthHandler } from '@/utils/services/hooksAuth'


const Login = () => {
  const authHook = useAuthHandler()
  
  return (
      <form
        onSubmit={authHook.loginHandler}
        className='flex flex-col gap-16 items-center justify-center w-full h-screen min-h-screen p-5  md:px-24 md:py-16 bg-rich-black-500 text-white'
      >
        <Logo
          size='w-[35px] h-[56px] p-5  text-xl md:text-xl'
          space='space-x-2'
        />
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
                  name='email'
                  placeholder='Email'
                  id='userEmail'
                  className='border-2 border-black bg-black h-[56px] pl-5 outline-none'
                  required
                />
              </label>
              <label htmlFor='password' className='flex flex-col w-full'>
                <input
                  type='password'
                  name='password'
                  placeholder='Contraseña'
                  id='password'
                  className='border-2 border-black bg-black h-[56px] pl-5 outline-none'
                  required
                />
              </label>
            </label>
          </div>
          <div className='flex text-red-500 min-h-[25px] items-end justify-center'>
            <small>{authHook.errorAuth}</small>
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
