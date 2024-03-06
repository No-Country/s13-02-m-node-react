/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useEffect, useState } from 'react'
import { Typography, useMediaQuery } from '@mui/material'
import Link from 'next/link'
import axios from 'axios'
import { useQuestionChallenge } from '@/utils/services/hooksChallenge'
import {
  useGetProgressThemes,
  useGetThemes
} from '@/utils/services/progressRequest/themesHooks'

const Roadmap = ({ selectedLanguageId, progressStackId }) => {
  const [token, setToken] = useState('')
  useEffect(() => {
    setToken(localStorage.getItem('idKey'))
  }, [])
  const questionsHook = useQuestionChallenge()

  const { themes } = useGetThemes()
  const { progressThemes } = useGetProgressThemes(progressStackId)

  const checkIfThemeExists = () => {
    if (!Array.isArray(progressThemes) || progressThemes.length === 0) {
      return false
    }
    const progressThemeIds = progressThemes.map(
      (progressTheme) => progressTheme.themeId
    )
    const hasCommonThemeId = themes.some((theme) =>
      progressThemeIds.includes(theme.id)
    )
    return hasCommonThemeId
  }

  useEffect(() => {
    if (checkIfThemeExists()) {
      console.log(true)
    }
  }, [])

  const getButtonMarginLeft = (index) => {
    if (index === 0) {
      return `0px`
    } else if (index < 5) {
      return `${index * 50 - 100}px`
    } else if (index < 12) {
      return `${(index - 6) * -30}px`
    } else if (index < 18) {
      return `${(index - 12) * 30 - 100}px`
    } else {
      return `${(index - 18) * -30}px`
    }
  }

  const isXsOrMd = useMediaQuery('(max-width:960px)')
  const imagesHidden = useMediaQuery('(max-width:1230px)')
  const filteredThemes = themes?.filter(
    (item) => item.stackId === selectedLanguageId
  )

  const AddThemeProgress = (themeId, progressStackId) => {
    return axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/progress-themes`,
      {
        theme: themeId,
        progressStack: progressStackId
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
  }

  const handleButtonClick = async (themeId, progressStackId, data) => {
    const questionData = {
      theme: data.name,
      level: data.level,
      id_user: '4cfc810c-d9bc-48dc-bab6-caac44f307cd',
      quest_number: 10
    }
    progressThemes
      ? questionsHook.handlerQuestionChallengePost(questionData)
      : {}
    try {
      if (
        !Array.isArray(progressThemes) ||
        !progressThemes.some(
          (progressTheme) => progressTheme.themeId === themeId
        )
      ) {
        const response = await AddThemeProgress(themeId, progressStackId)
        console.log('Theme added to progress:', response.data)
      }
    } catch (error) {
      console.error('Error adding theme to progress:', error)
    }
  }
  return (
    <>
      {filteredThemes?.length === 0 ? (
        <Typography
          className='text-white'
          align='center'
          sx={{ fontSize: '24px' }}
          fontWeight={100}
        >
          More challenges coming soon
        </Typography>
      ) : (
        <div className='grid grid-cols-3'>
          <div className=''>
            {imagesHidden ? null : (
              <img
                src='https://i.ibb.co/HT82H7W/amico.webp'
                alt='Principiante'
                className='w-[18%] absolute top-[350px] ml-10 '
              />
            )}
            {imagesHidden ? null : (
              <img
                src='https://i.ibb.co/6J4K7qt/Group69.webp'
                alt='Avanzado'
                className='w-[75%] mt-[900px] ml-10'
              />
            )}
          </div>
          <div className={`flex flex-col items-center justify-center  `}>
            {filteredThemes?.map((data, index) => {
              const buttonClass =
                Array.isArray(progressThemes) &&
                progressThemes.some(
                  (progressTheme) => progressTheme.themeId === data.id
                )
                  ? 'bg-[#A87FFB]'
                  : 'bg-[#707070]'

              return (
                <button
                  key={index}
                  onClick={() =>
                    handleButtonClick(data.id, progressStackId, data)
                  }
                  className={` 
                  ${buttonClass} 
                mb-4 
                md:ml-0 
                text-white 
                font-medium
                w-[270px] 
                h-[50px]
                border-[4px]
                ${
                  data.level == '1'
                    ? 'border-[#17B877]'
                    : data.level == '2'
                    ? 'border-[#08744d]'
                    : 'border-[#094b35]'
                }
                rounded-[19px]
                hover:bg-[#A87FFA]
                capitalize
                `}
                  style={{
                    marginLeft: isXsOrMd ? '0px' : getButtonMarginLeft(index)
                  }}
                >
                  {data.name}
                </button>
              )
            })}
          </div>

          {imagesHidden ? null : (
            <img
              src='https://i.ibb.co/KrYLVP3/Group67.webp'
              alt='Intermedio'
              className='w-[75%] mt-[700px]'
            />
          )}
        </div>
      )}
    </>
  )
}

export default Roadmap
