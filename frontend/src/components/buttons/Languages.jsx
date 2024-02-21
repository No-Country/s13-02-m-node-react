'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import { Button, styled } from '@mui/material'
import Stack from '@mui/material/Stack'
import { useMediaQuery } from '@mui/material'

const LanguageButton = styled(Button)({
  color: '#ffffff',
  borderColor: '#86198f',
  '&:hover': {
    borderColor: '#d946ef',
    backgroundColor: '#d946ef'
  }
})

const Languages = ({ onClick, data }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(Object.keys(data))

  const handleButtonClick = (language) => {
    setSelectedLanguage(language)
    // onClick(language)
  }

  useEffect(() => {
    // onClick(selectedLanguage)
  }, [selectedLanguage, onClick])

  return (
    <div className='mb-3'>
      <Stack spacing={2} direction='row'>
        {data.map((res) => (
          <LanguageButton
            key={res.name}
            variant='outlined'
            onClick={() => handleButtonClick(res.name)}
            style={{
              backgroundColor: selectedLanguage === res.name ? '#d946ef' : ''
            }}
          >
            {res.name}
          </LanguageButton>
        ))}
      </Stack>
    </div>
  )
}

export default Languages
