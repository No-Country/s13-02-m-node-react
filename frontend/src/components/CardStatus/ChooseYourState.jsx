'use client'
import { useEffect, useState } from 'react'
import {
  Avatar,
  Badge,
  Button,
  IconButton,
  Skeleton,
  styled
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import GridStatues from './GridStatues'
import { useSelector } from 'react-redux'

function stringToColor(string) {
  let hash = 0
  let i
  for (i = 0; i < string?.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }
  let color = '#'
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.slice(-2)
  }
  return color
}

function stringAvatar(name) {
  const initials = name
    ?.split(' ')
    ?.map((part) => part[0])
    ?.join('')
    ?.toUpperCase()
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: 65,
      height: 65
    },
    children: initials
  }
}

const ChooseYourState = ({ dataLoaded }) => {
  const [name, setName] = useState('')
  const [selectedButton, setSelectedButton] = useState(null)
  const avatar = useSelector((state) => state.auth.avatar)

  useEffect(() => {
    const storedIcon = localStorage.getItem('selectedStatusIcon')
    if (storedIcon) {
      setSelectedButton(storedIcon)
    } else {
      setSelectedButton('💻')
    }
    setName(avatar)
  }, [avatar])

  const handleButtonClick = (content) => {
    setSelectedButton(content)
    localStorage.setItem('selectedStatusIcon', content)
  }

  const statusData = [
    '💻',
    '🤘🏼',
    '🥳',
    '🤖',
    '👾',
    '😢',
    '🤩',
    '🤓',
    '😎',
    '🖐🏼',
    '🚀',
    '🙂'
  ]

  return (
    <div className='w-full'>
      <div className='w-full bg-jet-500 p-5 space-y-5 rounded-xl shadow-md shadow-picton-blue-800'>
        <div className='w-full flex items-center justify-between'>
          {dataLoaded ? (
            <Skeleton variant='text' width={120} height={24} />
          ) : (
            <h2 className='text-white font-medium text-sm md:text-lg'>
              Elige tu estado
            </h2>
          )}
          <div className='md:hidden'>
            {dataLoaded ? (
              <Skeleton variant='circular' width={24} height={24} />
            ) : (
              <IconButton aria-label='close' color='primary' size='small'>
                <CloseIcon className='text-white' />
              </IconButton>
            )}
          </div>
        </div>

        <div className='w-full flex items-center justify-center'>
          {dataLoaded ? (
            <Skeleton variant='circular' width={65} height={65} />
          ) : (
            <div className='relative inline-block'>
              <Avatar src={'Cristian Vásquez'} {...stringAvatar(name)} />
              <span className='absolute top-2 -right-2 inline-flex items-center justify-center w-9 h-9 transform translate-x-1/2 -translate-y-1/2 bg-jet-500 border border-rich-black-500 rounded-t-full rounded-r-full'>
                {selectedButton}
              </span>
            </div>
          )}
        </div>
        {dataLoaded ? (
          <Skeleton variant='rectangular' width={280} height={80} />
        ) : (
          <GridStatues data={statusData} onClick={handleButtonClick} />
        )}
        <div className='w-full flex items-center justify-center md:hidden'>
          {dataLoaded ? (
            <Skeleton variant='rectangular' width={64} height={36} />
          ) : (
            <Button variant='contained'>Ok</Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChooseYourState
