'use client'
import HeartCounter from '@/components/lives-counter/HeartCounter'
import ProgressBar from '@/components/progressBar/ProgressBar'
import React, { useEffect, useState } from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { useQuestionChallenge } from '@/utils/services/handlersChallenge'

// const questionsDesafios = [
//   {
//     title:
//       "Declara una variable llamada 'platoFavorito' y asígnale el valor 'pizza'."
//   },
//   {
//     title:
//       "Crea una variable llamada 'estaciónDelAño' y asígnale el valor 'otoño'."
//   },
//   {
//     title:
//       "Declara una variable llamada 'deporteFavorito' y asígnale el valor 'baloncesto'."
//   },
//   {
//     title:
//       "Crea una variable llamada 'ciudadSoñada' y asígnale el valor 'Nueva York'."
//   },
//   {
//     title:
//       "Declara una variable llamada 'marcaDeRopa' y asígnale el valor 'Nike'."
//   },
//   {
//     title:
//       "Crea una variable llamada 'actorFavorito' y asígnale el valor 'Leonardo DiCaprio'."
//   },
//   {
//     title:
//       "Declara una variable llamada 'libroPreferido' y asígnale el valor '1984'."
//   },
//   {
//     title:
//       "Crea una variable llamada 'redSocialPreferida' y asígnale el valor 'Instagram'."
//   },
//   {
//     title:
//       "Declara una variable llamada 'instrumentoMusical' y asígnale el valor 'piano'."
//   },
//   {
//     title:
//       "Crea una variable llamada 'bebidaFriaPreferida' y asígnale el valor 'limonada'."
//   }
// ]
const Challenges = () => {
  const questionsHook = useQuestionChallenge()

  return (
    <main className='flex flex-col w-full h-full mt-[100px] justify-center items-center'>
      <section className='flex items-center max-w-[1136px] w-full gap-8 justify-center'>
        <button onClick={questionsHook.goBackHandler}>
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
        <form
          className='flex flex-col gap-5 w-full items-center'
          onSubmit={
            questionsHook.questionVisible
            // questionsHook.questionChallengePost
          }
        >
          <input name='pointsWin' defaultValue={2} type='text' hidden />
          <input name='theme' defaultValue={'arrays'} type='text' hidden />
          <textarea
            name='question'
            className='max-w-[1224px] min-h-[270px] w-full bg-jet-500 rounded-md text-white px-10 py-4 resize-none outline-none'
            defaultValue={questionsHook.questionRender}
            readOnly
          />
          <textarea
            name='response'
            placeholder='Escribe aquí tu respuesta'
            className='max-w-[1224px] min-h-[170px] w-full bg-jet-500 rounded-md text-white px-10 py-4 resize-none focus:outline-none focus:ring focus:border-picton-blue-700'
          />
          <input
            // onClick={}
            type='submit'
            value='Enviar'
            className='border-[1px] border-picton-blue-700 rounded px-4 py-2 text-picton-blue-500 sef-center'
          />
        </form>
      </section>
    </main>
  )
}

export default Challenges
