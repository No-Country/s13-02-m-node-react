'use client'
import HeartCounter from '@/components/lives-counter/HeartCounter'
import ProgressBar from '@/components/progressBar/ProgressBar'
import React, { useEffect, useState } from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { useQuestionChallenge } from '@/utils/services/hooksChallenge'
import Pet from '../pet/Pet'
import { useRouter } from 'next/navigation'

const Challenges = () => {
  const route = useRouter()
  const questionsHook = useQuestionChallenge()
  // questionsHook.questionRender ? route.push('/') : {}
  return (
    <main className='flex flex-col w-full h-full mt-[100px] justify-center items-center'>
      <section className='flex items-center max-w-[1136px] w-full gap-8 justify-center'>
        <button onClick={questionsHook.goBackHandler}>
          <ArrowBackIosIcon className='text-white' />
        </button>
        <ProgressBar
          value={questionsHook.questionNumber * 10}
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
          onReset={questionsHook.questionVisible}
          onSubmit={questionsHook.handlerResponseChallengePost}
        >
          {/* <input name='pointsWin' defaultValue={2} type='text' hidden />
          <input name='theme' defaultValue={'arrays'} type='text' hidden /> */}
          <textarea
            name='question'
            className='max-w-[1224px] min-h-auto w-full bg-jet-500 rounded-md text-white px-10 py-4 resize-none outline-none'
            defaultValue={questionsHook.questionRender}
            readOnly
          />
          <textarea
            required
            name='response'
            placeholder='Escribe aquí tu respuesta'
            className='max-w-[1224px] min-h-[170px] w-full bg-jet-500 rounded-md text-white px-10 py-4 resize-none focus:outline-none focus:ring focus:border-picton-blue-700'
          />

          {questionsHook.feedback.feedback ? (
            <>
              <input
                type='reset'
                value='Siguiente'
                className='border-[1px] border-picton-blue-700 rounded px-4 py-2 text-picton-blue-500 sef-center'
              />
              <article
                className={`flex gap-5 w-full max-w-[380px] min-h-[124px] border-transparent absolute 
                right-5 mt-[24px] bg-jet-500 rounded-[16px] p-5 items-center text-white text-wrap border-2 aspect-auto 
      ${
        questionsHook.feedback.isCorrect
          ? 'shadow-shadowTrueFeedbackAlert'
          : 'shadow-shadowFalseFeedbackAlert'
      } animate-feedback`}
              >
                <Pet className='w-[86px]' />
                <span>{questionsHook.feedback.feedback}</span>
              </article>
            </>
          ) : (
            <input
              type='submit'
              value='Enviar'
              className='border-[1px] border-picton-blue-700 rounded px-4 py-2 text-picton-blue-500 sef-center'
            />
          )}
        </form>
      </section>
    </main>
  )
}

export default Challenges
