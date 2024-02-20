'use client'
import HeartCounter from '@/components/lives-counter/HeartCounter'
import ProgressBar from '@/components/progressBar/ProgressBar'
import React from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { useRouter } from 'next/navigation'

const pageChallenges = () => {
  const router = useRouter()
  const goBackButton = () => {
    router.push('/')
  }
  return (
    <main className='flex flex-col w-full h-full mt-[100px] justify-center items-center'>
      <section className='flex items-center max-w-[1136px] w-full gap-8 justify-center'>
        <button onClick={goBackButton}>
          <ArrowBackIosIcon className='text-white' />
        </button>
        <ProgressBar
          value={10}
          data={''}
          title={''}
          styles={
            'h-[10px] rounded-full bg-rich-black-500 shadow-shadowProgressBar '
          }
        />
        <HeartCounter lives={2} />
      </section>
      <section className='w-full mt-10'>
        <form className='flex flex-col gap-5 w-full items-center'>
          <textarea
            className='max-w-[1224px] min-h-[270px] w-full bg-jet-500 rounded-md text-white p-10 resize-none outline-none'
            defaultValue={
              'Ejercicio lógico de JavaScript: Calcular el promedio de dos números Escribe un programa en JavaScript que pida al usuario dos números y luego calcule e imprima el promedio de esos dos números.'
            }
            readOnly
          />
          <textarea
            placeholder='Escribe aquí tu respuesta'
            className='max-w-[1224px] min-h-[170px] w-full bg-jet-500 rounded-md text-white p-10 resize-none focus:outline-none focus:ring focus:border-picton-blue-700'
          />
          <input
            type='submit'
            value='Enviar'
            className='border-[1px] border-picton-blue-700 rounded px-4 py-2 text-picton-blue-500 sef-center'
          />
        </form>
      </section>
    </main>
  )
}

export default pageChallenges
